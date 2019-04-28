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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
var Avatar = require('@atlaskit/avatar');
var AvatarGroup = require('@atlaskit/avatar-group');
import { gridSize, colors } from '@atlaskit/theme';
import InviteTeamIcon from '@atlaskit/icon/glyph/editor/add';
import { akEditorSmallZIndex } from '@atlaskit/editor-common';
import { pluginKey as collabEditPluginKey } from '../plugin';
import { getAvatarColor } from '../utils';
import WithPluginState from '@atlaskit/editor-core/ui/WithPluginState';
import ToolbarButton from '@atlaskit/editor-core/ui/ToolbarButton';
var AvatarContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-right: ", "px;\n  display: flex;\n  align-items: center;\n  div:last-child > button {\n    border-radius: 50%;\n    height: 32px;\n    width: 32px;\n    padding: 2px;\n  }\n"], ["\n  margin-right: ", "px;\n  display: flex;\n  align-items: center;\n  div:last-child > button {\n    border-radius: 50%;\n    height: 32px;\n    width: 32px;\n    padding: 2px;\n  }\n"])), gridSize());
var InviteTeamWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 50%;\n  min-width: ", "px;\n  margin-left: -", "px;\n"], ["\n  background: ", ";\n  border-radius: 50%;\n  min-width: ", "px;\n  margin-left: -", "px;\n"])), colors.N20, gridSize() * 4, gridSize() / 2);
var itemAppear = keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n0% {\n  transform: scale(0);\n}\n\n50% {\n  transform: scale(1.1);\n}\n\n100% {\n  transform: scale(1);\n}\n"], ["\n0% {\n  transform: scale(0);\n}\n\n50% {\n  transform: scale(1.1);\n}\n\n100% {\n  transform: scale(1);\n}\n"])));
var animateAvatar = function (_a) {
    var shouldAnimate = _a.shouldAnimate;
    if (!shouldAnimate) {
        return;
    }
    return "\n    & > div {\n      animation: " + itemAppear + " 500ms 1;\n      animation-fill-mode: both;\n    }\n  ";
};
var animateBadge = function (_a) {
    var shouldAnimate = _a.shouldAnimate;
    if (!shouldAnimate) {
        return;
    }
    return "\n    animation: " + itemAppear + " 250ms 1;\n    animation-fill-mode: both;\n    animation-delay: 400ms;\n  ";
};
var AvatarItem = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  align-self: center;\n\n  ", "\n\n  &::before {\n    content: '", "';\n    display: block;\n    position: absolute;\n    right: -1px;\n    bottom: -1px;\n    width: 13px;\n    height: 13px;\n    z-index: ", ";\n    border-radius: 3px;\n    background: ", ";\n    color: #fff;\n    font-size: 9px;\n    line-height: 0;\n    padding-top: 7px;\n    text-align: center;\n    box-shadow: 0 0 1px #fff;\n    box-sizing: border-box;\n\n    ", "\n  }\n"], ["\n  position: relative;\n  align-self: center;\n\n  ", "\n\n  &::before {\n    content: '", "';\n    display: block;\n    position: absolute;\n    right: -1px;\n    bottom: -1px;\n    width: 13px;\n    height: 13px;\n    z-index: ", ";\n    border-radius: 3px;\n    background: ", ";\n    color: #fff;\n    font-size: 9px;\n    line-height: 0;\n    padding-top: 7px;\n    text-align: center;\n    box-shadow: 0 0 1px #fff;\n    box-sizing: border-box;\n\n    ", "\n  }\n"])), animateAvatar, function (props) { return props.avatar; }, akEditorSmallZIndex, function (props) { return props.badgeColor; }, animateBadge);
function Item(props) {
    var color = getAvatarColor(props.sessionId).color.solid;
    var avatar = props.name.substr(0, 1).toUpperCase();
    var children = props.children, theme = props.theme, other = __rest(props, ["children", "theme"]);
    return (<AvatarItem badgeColor={color} avatar={avatar} shouldAnimate={props.isInteractive}>
      <Avatar {...other}/>
    </AvatarItem>);
}
var Avatars = /** @class */ (function (_super) {
    __extends(Avatars, _super);
    function Avatars() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAvatarClick = function () { };
        _this.renderAvatars = function (state) {
            if (!state.data) {
                return null;
            }
            var _a = state.data, sessionId = _a.sessionId, activeParticipants = _a.activeParticipants;
            var avatars = activeParticipants
                .toArray()
                .map(function (p) { return ({
                email: p.email,
                key: p.sessionId,
                name: p.name,
                src: p.avatar,
                sessionId: p.sessionId,
                size: 'medium',
                component: Item,
            }); })
                .sort(function (p) { return (p.sessionId === sessionId ? -1 : 1); });
            if (!avatars.length) {
                return null;
            }
            return (<AvatarContainer>
        <AvatarGroup appearance="stack" size="medium" data={avatars} onAvatarClick={_this.onAvatarClick}/>
        {_this.props.inviteToEditHandler && (<InviteTeamWrapper>
            <ToolbarButton onClick={_this.props.inviteToEditHandler} selected={_this.props.isInviteToEditButtonSelected} title="Invite to edit" titlePosition="bottom" iconBefore={<InviteTeamIcon label="Invite to edit"/>}/>
          </InviteTeamWrapper>)}
      </AvatarContainer>);
        };
        return _this;
    }
    Avatars.prototype.render = function () {
        return (<WithPluginState plugins={{ data: collabEditPluginKey }} render={this.renderAvatars} editorView={this.props.editorView}/>);
    };
    return Avatars;
}(React.Component));
export default Avatars;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
