import React, { Component } from 'react';
import { Editor, EditorContext, EditorActions, WithEditorActions } from '@atlaskit/editor-core';

const io = require('socket.io-client')
const websocket = io('http://localhost:8080', {autoConnect: false})
window.ioconnection = websocket
import { ApolloConsumer } from 'react-apollo'
import applyDevTools from 'prosemirror-dev-tools';
import gql from 'graphql-tag'
import styled from 'styled-components'
// import React, { Component } from 'react';
// import Button, { ButtonGroup } from '@atlaskit/button';
// import PubSubClient from '@atlaskit/pubsub';

// import {
//   storyMediaProviderFactory,
//   storyContextIdentifierProviderFactory,
// } from '@atlaskit/editor-test-helpers';

import { mention, emoji, taskDecision } from './util-data-test';

import { EmojiProvider } from '@atlaskit/emoji';
// import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
// import { extensionHandlers } from '../example-helpers/extension-handlers';

import { CollabProvider } from './collab-edit';

// socket.on('steps:created', () => { console.log('doop')})
const pubSubClient = {
  on: (event: string, callback: any) => { console.log('registering for', event)
    return websocket.on(event, callback)
  },
  off: (event: string, callback: any) => { console.log('unregistering for', event)
    return websocket.on(event, callback)
  },
  join: (room: string) => {
    console.log(websocket.connected, `should emit event for ${room}`)
    websocket.emit('join', room)
    return pubSubClient
  },
  leave: (room: string) => {
    websocket.emit('leave', room)
    return pubSubClient
  },
}

let randomSessionId = Math.random().toString()

localStorage.debug = "socket.io-client:*"
export const Content: any = styled.div`
  padding: 0 20px;
  height: 50%;
  background: #fff;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);

const SaveAndCancelButtons = (props: { editorActions: EditorActions }) => (
  <div>
    <button
      onClick={() =>
        props.editorActions
          .getValue()
          .then(value => console.log(value.toJSON()))
      }
    >
      Publish
    </button>
    <button onClick={() => props.editorActions.clear()}>
      Close
    </button>
  </div>
);

interface DropzoneEditorWrapperProps {
  children: (container: HTMLElement) => React.ReactNode;
}

class DropzoneEditorWrapper extends React.Component<
  DropzoneEditorWrapperProps,
  {}
> {
  dropzoneContainer: HTMLElement | null = null;

  handleRef = (node: HTMLElement) => {
    this.dropzoneContainer = node;
    this.forceUpdate();
  };

  render() {
    return (
      <Content ref={this.handleRef}>
        {this.dropzoneContainer
          ? this.props.children(this.dropzoneContainer)
          : null}
      </Content>
    );
  }
}

// const mediaProvider = storyMediaProviderFactory();

export type Props = {};
export type State = {
  isInviteToEditButtonSelected: boolean;
  documentId?: string;
  input?: HTMLInputElement;
  hasError?: boolean;
};

export function DevTools() {
  return (
    <WithEditorActions
      render={actions => {
        const editorView = actions._privateGetEditorView();
        if (editorView) {
          applyDevTools(editorView);
        }
        return null;
      }}
    />
  );
}


export default class App extends React.Component<Props, State> {
  state = {
    isInviteToEditButtonSelected: false,
    documentId: undefined,
    input: undefined,
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderErrorFlag() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            margin: 0,
            backgroundColor: '#FF5630',
            padding: '10px',
          }}
        >
          <strong>NOTE!</strong> Something went wrong in the editor. You may be
          out of sync.
        </div>
      );
    }
  }

  renderEditor() {
    const documentId = this.props.match.params.id;

    return (
      <div>
        {this.renderErrorFlag()}
        <ApolloConsumer>
          { client => {
            const { currentUser } = client.readQuery({
              query: gql`query CurrentUser {
                currentUser {
                  id
                  username
                }
              }`
            })
            return (
                    <DropzoneEditorWrapper>
                    {parentContainer => (
                      <EditorContext>
                        <>
                        <DevTools />
                        <Editor
                          appearance="full-page"
                          allowCodeBlocks={true}
                          allowLayouts={true}
                          allowLists={true}
                          allowTextColor={true}
                          allowTables={{
                            allowColumnResizing: true,
                            allowMergeCells: true,
                            allowNumberColumn: true,
                            allowBackgroundColor: true,
                            allowHeaderRow: true,
                            allowHeaderColumn: true,
                            permittedLayouts: 'all',
                            stickToolbarToBottom: true,
                          }}
                          // allowTemplatePlaceholders={{ allowInserting: true }}
                          // media={{
                          //   provider: mediaProvider,
                          //   allowMediaSingle: true,
                          //   customDropzoneContainer: parentContainer,
                          // }}
                          emojiProvider={
                            emoji.storyData.getEmojiResource() as Promise<EmojiProvider>
                          }
                          mentionProvider={Promise.resolve(
                            mention.storyData.resourceProvider,
                          )}
                          taskDecisionProvider={Promise.resolve(
                            taskDecision.getMockTaskDecisionResource(),
                          )}
                          // contextIdentifierProvider={storyContextIdentifierProviderFactory()}
                          collabEdit={{
                            useNativePlugin: true,
                            provider: Promise.resolve(
                              new CollabProvider(
                                {
                                  url: 'http://localhost:3000',
                                  securityProvider: () => ({
                                    headers: {
                                      Authorization: `Bearer ${localStorage.token}`,
                                      'user-session-id': `${currentUser.id}|${randomSessionId}`,
                                    },
                                  }),
                                  docId: documentId!,
                                  userId: `${currentUser.id}|${randomSessionId}`,
                                  websocket,
                                },
                                pubSubClient,
                              ),
                            ),
                            inviteToEditHandler: this.inviteToEditHandler,
                            isInviteToEditButtonSelected: this.state
                              .isInviteToEditButtonSelected,
                            userId: `${currentUser.id}|${randomSessionId}`,
                          }}
                          placeholder="Write something..."
                          shouldFocus={false}
                          primaryToolbarComponents={
                            <WithEditorActions
                              render={actions => (
                                <SaveAndCancelButtons editorActions={actions} />
                              )}
                            />
                          }
                          // allowExtension={true}
                          // insertMenuItems={customInsertMenuItems}
                          // extensionHandlers={extensionHandlers}
                        />
                        </>
                      </EditorContext>
                    )}
                  </DropzoneEditorWrapper>
            )
          }
          }
          </ApolloConsumer>
      </div>
    );
  }

  private handleRef = (input: HTMLInputElement) => {
    this.setState({ input });
  };

  // private onJoin = () => {
  //   const { input } = this.state;
  //   if (input) {
  //     const { value } = input as HTMLInputElement;
  //     if (value) {
  //       this.setState({
  //         documentId: value,
  //       });
  //     }
  //   }
  // };

  render() {
    console.log(this.props.match.params.id)
    return this.renderEditor()
  }

  private inviteToEditHandler = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      isInviteToEditButtonSelected: !this.state.isInviteToEditButtonSelected,
    });
    console.log('target', event.target);
  };
}
