import { Plugin, PluginKey, Transaction, Selection } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Step, ReplaceStep } from 'prosemirror-transform';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Dispatch } from '@atlaskit/editor-core/event-dispatcher';
import {
  getSendableSelection,
  handleInit,
  handleConnection,
  handlePresence,
  handleTelePointer,
  applyRemoteData,
} from './actions';
import {
  Participant,
  ConnectionData,
  PresenceData,
  TelepointerData,
} from './types';
import { Participants, ReadOnlyParticipants } from './participants';
import { findPointers, createTelepointers } from './utils';
import { CollabEditProvider } from './provider';
import { CollabEditOptions } from './types';



export const pluginKey = new PluginKey('collabEditPlugin');

export const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  options?: CollabEditOptions,
) => {
  let collabEditProvider: CollabEditProvider | null;
  let isReady = false;

  return new Plugin({
    key: pluginKey,
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const pluginState = prevPluginState.apply(tr);

        if (tr.getMeta('isRemote') !== true) {
          if (collabEditProvider) {
            collabEditProvider.send(tr, oldState, newState);
          }
        }

        const { activeParticipants: prevActiveParticipants } = prevPluginState;
        const { activeParticipants, sessionId } = pluginState;

        if (collabEditProvider) {
          const selectionChanged = !oldState.selection.eq(newState.selection);
          const participantsChanged = !prevActiveParticipants.eq(
            activeParticipants,
          );

          if (
            (sessionId && selectionChanged && !tr.docChanged) ||
            (sessionId && participantsChanged)
          ) {
            const selection = getSendableSelection(newState.selection);
            // Delay sending selection till next tick so that participants info
            // can go before it
            window.setTimeout(
              collabEditProvider.sendMessage.bind(collabEditProvider),
              0,
              {
                type: 'telepointer',
                selection,
                sessionId,
              },
            );
          }
        }

        dispatch(pluginKey, { activeParticipants, sessionId });
        return pluginState;
      },
    },
    props: {
      decorations(this: Plugin, state) {
        return this.getState(state).decorations;
      },
    },
    filterTransaction(tr, state) {
      // Don't allow transactions that modifies the document before
      // collab-plugin is ready.
      if (!isReady && tr.docChanged) {
        return false;
      }

      return true;
    },
    view(view) {
      providerFactory.subscribe(
        'collabEditProvider',
        async (name: string, providerPromise?: Promise<CollabEditProvider>) => {
          if (providerPromise) {
            collabEditProvider = await providerPromise;

            // Initialize provider
            collabEditProvider
              .on('init', data => {
                isReady = true;
                handleInit(data, view, options);
              })
              .on('connected', data => handleConnection(data, view))
              .on('data', data => applyRemoteData(data, view, options))
              .on('presence', data => handlePresence(data, view))
              .on('telepointer', data => handleTelePointer(data, view))
              .on('local-steps', data => {
                const { steps } = data;
                const { state } = view;

                const { tr } = state;
                steps.forEach((step: Step) => tr.step(step));

                const newState = state.apply(tr);
                view.updateState(newState);
              })
              .on('error', err => {
                // TODO: Handle errors property (ED-2580)
              })
              .initialize(
                () => view.state,
                json => Step.fromJSON(view.state.schema, json),
              );
          } else {
            collabEditProvider = null;
            isReady = false;
          }
        },
      );

      return {
        destroy() {
          providerFactory.unsubscribeAll('collabEditProvider');
          collabEditProvider = null;
        },
      };
    },
  });
};

const isReplaceStep = (step: Step) => step instanceof ReplaceStep;

/**
 * Returns position where it's possible to place a decoration.
 */
const getValidPos = (tr: Transaction, pos: number) => {
  const resolvedPos = tr.doc.resolve(pos);
  const backwardSelection = Selection.findFrom(resolvedPos, -1, true);
  // if there's no correct cursor position before the `pos`, we try to find it after the `pos`
  const forwardSelection = Selection.findFrom(resolvedPos, 1, true);
  return backwardSelection
    ? backwardSelection.from
    : forwardSelection
    ? forwardSelection.from
    : pos;
};

export class PluginState {
  private decorationSet: DecorationSet;
  private participants: Participants;
  private sid?: string;

  get decorations() {
    return this.decorationSet;
  }

  get activeParticipants() {
    return this.participants as ReadOnlyParticipants;
  }

  get sessionId() {
    return this.sid;
  }

  constructor(
    decorations: DecorationSet,
    participants: Participants,
    sessionId?: string,
  ) {
    this.decorationSet = decorations;
    this.participants = participants;
    this.sid = sessionId;
  }

  getInitial(sessionId: string) {
    const participant = this.participants.get(sessionId);
    return participant ? participant.name.substring(0, 1).toUpperCase() : 'X';
  }

  apply(tr: Transaction) {
    let { decorationSet, participants, sid } = this;

    const presenceData = tr.getMeta('presence') as PresenceData;
    const telepointerData = tr.getMeta('telepointer') as TelepointerData;
    const sessionIdData = tr.getMeta('sessionId') as ConnectionData;

    if (sessionIdData) {
      sid = sessionIdData.sid;
    }

    let add: Decoration[] = [];
    let remove: Decoration[] = [];

    if (presenceData) {
      const {
        joined = [] as Participant[],
        left = [] as { sessionId: string }[],
      } = presenceData;

      participants = participants.remove(left.map(i => i.sessionId));
      participants = participants.add(joined);

      // Remove telepointers for users that left
      left.forEach(i => {
        const pointers = findPointers(i.sessionId, decorationSet);
        if (pointers) {
          remove = remove.concat(pointers);
        }
      });
    }

    if (telepointerData) {
      const { sessionId } = telepointerData;
      if (participants.get(sessionId) && sessionId !== sid) {
        const oldPointers = findPointers(
          telepointerData.sessionId,
          decorationSet,
        );

        if (oldPointers) {
          remove = remove.concat(oldPointers);
        }

        const { anchor, head } = telepointerData.selection;
        const rawFrom = anchor < head ? anchor : head;
        const rawTo = anchor >= head ? anchor : head;
        const isSelection = rawTo - rawFrom > 0;

        let from = 1;
        let to = 1;

        try {
          from = getValidPos(
            tr,
            isSelection ? Math.max(rawFrom, 0) : rawFrom,
          );
          to = isSelection ? getValidPos(tr, rawTo) : from;
        } catch (err) {}

        add = add.concat(
          createTelepointers(
            from,
            to,
            sessionId,
            isSelection,
            this.getInitial(sessionId),
          ),
        );
      }
    }

    if (tr.docChanged) {
      // Adjust decoration positions to changes made by the transaction
      try {
        decorationSet = decorationSet.map(tr.mapping, tr.doc, {
          // Reapplies decorators those got removed by the state change
          onRemove: spec => {
            if (spec.pointer && spec.pointer.sessionId) {
              const step = tr.steps.filter(isReplaceStep)[0];
              if (step) {
                const { sessionId } = spec.pointer;
                const {
                  slice: {
                    content: { size },
                  },
                  from,
                } = step as any;
                const pos = getValidPos(
                  tr,
                  size
                    ? Math.min(from + size, tr.doc.nodeSize - 3)
                    : Math.max(from, 1),
                );

                add = add.concat(
                  createTelepointers(
                    pos,
                    pos,
                    sessionId,
                    false,
                    this.getInitial(sessionId),
                  ),
                );
              }
            }
          },
        });
      } catch (err) {}

      // Remove any selection decoration within the change range,
      // takes care of the issue when after pasting we end up with a dead selection
      tr.steps.filter(isReplaceStep).forEach(s => {
        const { from, to } = s as any;
        decorationSet.find(from, to).forEach((deco: any) => {
          // `type` is private, `from` and `to` are public in latest version
          // `from` != `to` means it's a selection
          if (deco.from !== deco.to) {
            remove.push(deco);
          }
        });
      });
    }

    const { selection } = tr;
    decorationSet.find().forEach((deco: any) => {
      if (deco.type.toDOM) {
        if (deco.from === selection.from && deco.to === selection.to) {
          deco.type.toDOM.classList.add('telepointer-dim');
          deco.type.side = -1;
        } else {
          deco.type.toDOM.classList.remove('telepointer-dim');
          deco.type.side = 0;
        }
      }
    });

    if (remove.length) {
      decorationSet = decorationSet.remove(remove);
    }

    if (add.length) {
      decorationSet = decorationSet.add(tr.doc, add);
    }

    return new PluginState(decorationSet, participants, sid);
  }

  static init(config: any) {
    const { doc } = config;
    return new PluginState(DecorationSet.create(doc, []), new Participants());
  }
}
