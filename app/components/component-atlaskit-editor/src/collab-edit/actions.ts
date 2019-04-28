import { receiveTransaction } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import {
  AllSelection,
  NodeSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import {
  InitData,
  RemoteData,
  ConnectionData,
  PresenceData,
  TelepointerData,
  SendableSelection,
  CollabEditOptions,
} from './types';

import { replaceDocument } from './utils';

export const handleInit = (
  initData: InitData,
  view: EditorView,
  options?: CollabEditOptions,
) => {
  const { doc, json, version } = initData;
  if (doc) {
    const { state } = view;
    const tr = replaceDocument(doc, state, version, options);
    tr.setMeta('isRemote', true);
    const newState = state.apply(tr);
    view.updateState(newState);
  } else if (json) {
    applyRemoteSteps(json, undefined, view);
  }
};

export const handleConnection = (
  connectionData: ConnectionData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('sessionId', connectionData));
};

export const handlePresence = (
  presenceData: PresenceData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('presence', presenceData));
};

export const applyRemoteData = (
  remoteData: RemoteData,
  view: EditorView,
  options?: CollabEditOptions,
) => {
  const { json, newState, userIds = [] } = remoteData;
  if (json) {
    applyRemoteSteps(json, userIds, view, options);
  } else if (newState) {
    view.updateState(newState);
  }
};

export const applyRemoteSteps = (
  json: any[],
  userIds: string[] | undefined,
  view: EditorView,
  options?: CollabEditOptions,
) => {
  if (!json || !json.length) {
    return;
  }

  const {
    state,
    state: { schema },
  } = view;

  const steps = json.map(step => Step.fromJSON(schema, step));

  let tr: Transaction;

  if (options && options.useNativePlugin && userIds) {
    tr = receiveTransaction(state, steps, userIds);
  } else {
    tr = state.tr;
    steps.forEach(step => tr.step(step));
  }

  if (tr) {
    tr.setMeta('addToHistory', false);
    tr.setMeta('isRemote', true);

    const { from, to } = state.selection;
    const [firstStep] = json;

    /**
     * If the cursor is a the same position as the first step in
     * the remote data, we need to manually set it back again
     * in order to prevent the cursor from moving.
     */
    if (from === firstStep.from && to === firstStep.to) {
      tr.setSelection(state.selection);
    }

    const newState = state.apply(tr);
    view.updateState(newState);
  }
};

export const handleTelePointer = (
  telepointerData: TelepointerData,
  view: EditorView,
) => {
  const {
    state: { tr },
  } = view;
  view.dispatch(tr.setMeta('telepointer', telepointerData));
};

function isAllSelection(selection: Selection) {
  return selection instanceof AllSelection;
}

function isNodeSelection(selection: Selection) {
  return selection instanceof NodeSelection;
}

export const getSendableSelection = (
  selection: Selection,
): SendableSelection => {
  /**
   * <kbd>CMD + A</kbd> triggers a AllSelection
   * <kbd>escape</kbd> triggers a NodeSelection
   */
  return {
    type: 'textSelection',
    anchor: selection.anchor,
    head:
      isAllSelection(selection) || isNodeSelection(selection)
        ? selection.head - 1
        : selection.head,
  };
};
