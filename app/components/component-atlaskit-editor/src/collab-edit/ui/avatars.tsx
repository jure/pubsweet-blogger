import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { EditorView } from 'prosemirror-view';
import Avatar from '@atlaskit/avatar'
import AvatarGroup from '@atlaskit/avatar-group'
import { gridSize, colors } from '@atlaskit/theme';
import InviteTeamIcon from '@atlaskit/icon/glyph/editor/add';
import { akEditorSmallZIndex } from '@atlaskit/editor-common';

import { EventDispatcher } from '@atlaskit/editor-core/event-dispatcher';
import { pluginKey as collabEditPluginKey, PluginState } from '../plugin';
import { getAvatarColor } from '../utils';
import WithPluginState from '@atlaskit/editor-core/ui/WithPluginState';
import ToolbarButton from '@atlaskit/editor-core/ui/ToolbarButton';

export interface Props {
  inviteToEditHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  isInviteToEditButtonSelected?: boolean;
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
}

const AvatarContainer = styled.div`
  margin-right: ${gridSize()}px;
  display: flex;
  align-items: center;
  div:last-child > button {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    padding: 2px;
  }
`;

const InviteTeamWrapper = styled.div`
  background: ${colors.N20};
  border-radius: 50%;
  min-width: ${gridSize() * 4}px;
  margin-left: -${gridSize() / 2}px;
`;

const itemAppear = keyframes`
0% {
  transform: scale(0);
}

50% {
  transform: scale(1.1);
}

100% {
  transform: scale(1);
}
`;

const animateAvatar = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  if (!shouldAnimate) {
    return;
  }

  return css`
    & > div {
      animation: ${itemAppear} 500ms 1;
      animation-fill-mode: both;
    }
  `;
};

const animateBadge = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  if (!shouldAnimate) {
    return;
  }

  return css`
    animation: ${itemAppear} 250ms 1;
    animation-fill-mode: both;
    animation-delay: 400ms;
  `;
};

const AvatarItem: any = styled.div`
  position: relative;
  align-self: center;

  ${animateAvatar}

  &::before {
    content: '${(props: any) => props.avatar}';
    display: block;
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 13px;
    height: 13px;
    z-index: ${akEditorSmallZIndex};
    border-radius: 3px;
    background: ${(props: any) => props.badgeColor};
    color: #fff;
    font-size: 9px;
    line-height: 0;
    padding-top: 7px;
    text-align: center;
    box-shadow: 0 0 1px #fff;
    box-sizing: border-box;

    ${animateBadge}
  }
`;

function Item(props: any) {
  const color = getAvatarColor(props.sessionId).color.solid;
  const avatar = props.name.substr(0, 2).toUpperCase();
  const { children, theme, ...other } = props;

  return (
    <AvatarItem
      badgeColor={color}
      avatar={avatar}
      shouldAnimate={props.isInteractive}
    >
      <Avatar {...other} />
    </AvatarItem>
  );
}
export default class Avatars extends React.Component<Props, any> {
  private onAvatarClick = () => {};
  private renderAvatars = (state: { data?: PluginState }) => {
    if (!state.data) {
      return null;
    }
    const { sessionId, activeParticipants } = state.data as PluginState;
    const avatars = activeParticipants
      .toArray()
      .map(p => ({
        email: p.email,
        key: p.sessionId,
        name: p.name,
        src: p.avatar,
        sessionId: p.sessionId,
        size: 'medium',
        component: Item,
      }))
      .sort(p => (p.sessionId === sessionId ? -1 : 1));

    if (!avatars.length) {
      return null;
    }

    return (
      <AvatarContainer>
        <AvatarGroup
          appearance="stack"
          size="medium"
          data={avatars}
          onAvatarClick={this.onAvatarClick}
        />
        {/* {this.props.inviteToEditHandler && (
          <InviteTeamWrapper>
            <ToolbarButton
              onClick={this.props.inviteToEditHandler}
              selected={this.props.isInviteToEditButtonSelected}
              title="Invite to edit"
              titlePosition="bottom"
              iconBefore={<InviteTeamIcon label="Invite to edit" />}
            />
          </InviteTeamWrapper>
        )} */}
      </AvatarContainer>
    );
  };

  render() {
    return (
      <WithPluginState
        plugins={{ data: collabEditPluginKey }}
        render={this.renderAvatars}
        editorView={this.props.editorView}
      />
    );
  }
}
