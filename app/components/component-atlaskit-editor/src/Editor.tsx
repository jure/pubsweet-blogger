import React, { Component } from 'react';
import { Editor, EditorContext, EditorActions, WithEditorActions } from '@atlaskit/editor-core';

const io = require('socket.io-client')
const socket = io.connect('http://localhost:8080')


import styled from 'styled-components';
// import React, { Component } from 'react';
// import Button, { ButtonGroup } from '@atlaskit/button';
// import PubSubClient from '@atlaskit/pubsub';


// import {
//   storyMediaProviderFactory,
//   storyContextIdentifierProviderFactory,
// } from '@atlaskit/editor-test-helpers';

// import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';

// import { EmojiProvider } from '@atlaskit/emoji';
// import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
// import { extensionHandlers } from '../example-helpers/extension-handlers';

import { CollabProvider } from './collab-edit';


export const getRandomUser = () => {
  return Math.floor(Math.random() * 10000).toString();
};

const userId = `user/${getRandomUser()}`;



// const pubSubClient = new PubSubClient({
//   product: 'TEST',
//   url: 'https://localhost:',
//   securityProvider: () => {
//     return {
//       headers: {
//         Authorization: 'test',
//       },
//     };
//   },
// });

socket.on('connect', () => {
  // just a test
  console.log('woooot')
  socket.emit('test', 'test')
})
// socket.on('steps:created', () => { console.log('doop')})
const pubSubClient = {
  on: (event: string, callback: any) => { console.log('registering for', event)
    socket.emit('test', 'test')
    return socket.on(event, callback)
  },
  off: (event: string, callback: any) => { console.log('unregistering for', event)
  return socket.on(event, callback)
  },
  join: (room: string) => {
    console.log(socket.connected, `should emit event for ${room}`)
    socket.emit('join', room)
    return pubSubClient
  },
  leave: (room: string) => {
    socket.emit('leave', room)
    return pubSubClient
  },
}

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
        <DropzoneEditorWrapper>
          {parentContainer => (
            <EditorContext>
              <Editor
                appearance="full-page"
                analyticsHandler={analyticsHandler}
                allowAnalyticsGASV3={true}
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
                allowTemplatePlaceholders={{ allowInserting: true }}
                // media={{
                //   provider: mediaProvider,
                //   allowMediaSingle: true,
                //   customDropzoneContainer: parentContainer,
                // }}
                // emojiProvider={
                //   emoji.storyData.getEmojiResource() as Promise<EmojiProvider>
                // }
                // mentionProvider={Promise.resolve(
                //   mention.storyData.resourceProvider,
                // )}
                // taskDecisionProvider={Promise.resolve(
                //   taskDecision.getMockTaskDecisionResource(),
                // )}
                // contextIdentifierProvider={storyContextIdentifierProviderFactory()}
                collabEdit={{
                  useNativePlugin: true,
                  provider: Promise.resolve(
                    new CollabProvider(
                      {
                        url: 'http://localhost:3000',
                        securityProvider: () => ({
                          headers: {
                            Authorization: 'test',
                            'user-ari': userId,
                          },
                          omitCredentials: true,
                        }),
                        docId: documentId!,
                        userId,
                      },
                      pubSubClient,
                    ),
                  ),
                  inviteToEditHandler: this.inviteToEditHandler,
                  isInviteToEditButtonSelected: this.state
                    .isInviteToEditButtonSelected,
                  userId,
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
                allowExtension={true}
                // insertMenuItems={customInsertMenuItems}
                // extensionHandlers={extensionHandlers}
              />
            </EditorContext>
          )}
        </DropzoneEditorWrapper>
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
