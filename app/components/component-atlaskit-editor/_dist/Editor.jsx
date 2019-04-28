var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core';
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080');
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
export var getRandomUser = function () {
    return Math.floor(Math.random() * 10000).toString();
};
var userId = "user/" + getRandomUser();
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
localStorage.debug = "socket.io-client:socket";
export var Content = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 20px;\n  height: 50%;\n  background: #fff;\n  box-sizing: border-box;\n"], ["\n  padding: 0 20px;\n  height: 50%;\n  background: #fff;\n  box-sizing: border-box;\n"])));
Content.displayName = 'Content';
var analyticsHandler = function (actionName, props) {
    return console.log(actionName, props);
};
var SaveAndCancelButtons = function (props) { return (<div>
    <button onClick={function () {
    return props.editorActions
        .getValue()
        .then(function (value) { return console.log(value.toJSON()); });
}}>
      Publish
    </button>
    <button onClick={function () { return props.editorActions.clear(); }}>
      Close
    </button>
  </div>); };
var DropzoneEditorWrapper = /** @class */ (function (_super) {
    __extends(DropzoneEditorWrapper, _super);
    function DropzoneEditorWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dropzoneContainer = null;
        _this.handleRef = function (node) {
            _this.dropzoneContainer = node;
            _this.forceUpdate();
        };
        return _this;
    }
    DropzoneEditorWrapper.prototype.render = function () {
        return (<Content ref={this.handleRef}>
        {this.dropzoneContainer
            ? this.props.children(this.dropzoneContainer)
            : null}
      </Content>);
    };
    return DropzoneEditorWrapper;
}(React.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isInviteToEditButtonSelected: false,
            documentId: undefined,
            input: undefined,
            hasError: false,
        };
        _this.handleRef = function (input) {
            _this.setState({ input: input });
        };
        _this.onJoin = function () {
            var input = _this.state.input;
            if (input) {
                var value = input.value;
                if (value) {
                    _this.setState({
                        documentId: value,
                    });
                }
            }
        };
        _this.inviteToEditHandler = function (event) {
            _this.setState({
                isInviteToEditButtonSelected: !_this.state.isInviteToEditButtonSelected,
            });
            console.log('target', event.target);
        };
        return _this;
    }
    App.prototype.componentDidCatch = function () {
        this.setState({ hasError: true });
    };
    App.prototype.renderErrorFlag = function () {
        if (this.state.hasError) {
            return (<div style={{
                margin: 0,
                backgroundColor: '#FF5630',
                padding: '10px',
            }}>
          <strong>NOTE!</strong> Something went wrong in the editor. You may be
          out of sync.
        </div>);
        }
    };
    App.prototype.renderDocumentId = function () {
        return (<div style={{
            margin: 0,
            backgroundColor: '#00B8D9',
            padding: '10px',
        }}>
        <strong>DocumentId:</strong> {this.state.documentId}
      </div>);
    };
    App.prototype.renderEditor = function () {
        var _this = this;
        var documentId = this.state.documentId;
        socket.on('connect', function () { console.log('woooot'); });
        // socket.on('steps:created', () => { console.log('doop')})
        var pubSubClient = {
            on: function (event, callback) {
                console.log('registering for ', event);
                return socket.on(event, callback);
            },
            off: function (event, callback) {
                console.log('unregistering for ', event);
                return socket.on(event, callback);
            },
            join: function (room) { return socket.emit('join', room); },
            leave: function (room) { return socket.emit('leave', room); },
        };
        return (<div>
        {this.renderErrorFlag()}
        {this.renderDocumentId()}
        <DropzoneEditorWrapper>
          {function (parentContainer) { return (<EditorContext>
              <Editor appearance="full-page" analyticsHandler={analyticsHandler} allowAnalyticsGASV3={true} allowCodeBlocks={true} allowLayouts={true} allowLists={true} allowTextColor={true} allowTables={{
            allowColumnResizing: true,
            allowMergeCells: true,
            allowNumberColumn: true,
            allowBackgroundColor: true,
            allowHeaderRow: true,
            allowHeaderColumn: true,
            permittedLayouts: 'all',
            stickToolbarToBottom: true,
        }} allowTemplatePlaceholders={{ allowInserting: true }} 
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
            provider: Promise.resolve(new CollabProvider({
                url: 'http://localhost:3000',
                securityProvider: function () { return ({
                    headers: {
                        Authorization: 'test',
                        'user-ari': userId,
                    },
                    omitCredentials: true,
                }); },
                docId: documentId,
                userId: userId,
            }, pubSubClient)),
            inviteToEditHandler: _this.inviteToEditHandler,
            isInviteToEditButtonSelected: _this.state
                .isInviteToEditButtonSelected,
            userId: userId,
        }} placeholder="Write something..." shouldFocus={false} primaryToolbarComponents={<WithEditorActions render={function (actions) { return (<SaveAndCancelButtons editorActions={actions}/>); }}/>} allowExtension={true}/>
            </EditorContext>); }}
        </DropzoneEditorWrapper>
      </div>);
    };
    App.prototype.render = function () {
        var documentId = this.state.documentId;
        if (documentId) {
            return this.renderEditor();
        }
        return (<div>
        Document name: <input ref={this.handleRef}/>
        <button onClick={this.onJoin}>Join</button>
      </div>);
    };
    return App;
}(React.Component));
export default App;
var templateObject_1;
