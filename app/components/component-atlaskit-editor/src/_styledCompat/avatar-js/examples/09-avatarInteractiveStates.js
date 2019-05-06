//
import React from 'react'

import Avatar from '../src'
import { Code, Note } from '../examples-util/helpers'
import { avatarUrl } from '../examples-util/data'

const stackSourceURLs = []
const avatarSize = 'large'

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 20; i++) stackSourceURLs.push(i)

const AvatarShowcase = ({ children, description, title }) => (
  <div style={{ alignItems: 'center', display: 'flex', marginBottom: '1em' }}>
    <div style={{ marginRight: '1em' }}>{children}</div>
    <div style={{ flex: 1 }}>
      <h5>{title}</h5>
      <Note>{description}</Note>
    </div>
  </div>
)

export default () => (
  <div>
    <h2>Interactive Avatars</h2>
    <Note size="large">
      For most instances you will no-longer need to wrap{' '}
      <Code>{'<Avatar/>'}</Code>.
    </Note>
    <AvatarShowcase
      description={
        <span>
          Provide <Code>onClick</Code> to <Code>{'<Avatar/>'}</Code> or{' '}
          <Code>onAvatarClick</Code> to <Code>{'<AvatarGroup/>'}</Code>
        </span>
      }
      title="Button"
    >
      <Avatar onClick={console.info} size={avatarSize} src={avatarUrl} />
    </AvatarShowcase>

    <AvatarShowcase
      description={
        <span>
          Provide <Code>href</Code> to <Code>{'<Avatar/>'}</Code>. Also,
          optionally accepts a <Code>target</Code> property.
        </span>
      }
      title="Anchor"
    >
      <Avatar
        href="http://atlaskit.atlassian.com"
        size={avatarSize}
        src={avatarUrl}
        target="_blank"
      />
    </AvatarShowcase>

    <AvatarShowcase
      description={
        <span>
          Provide <Code>name</Code> to <Code>{'<Avatar/>'}</Code>. Image
          receives alt-text and an aria-label, which describes the image to
          screenreaders.
        </span>
      }
      title="Tooltip"
    >
      <Avatar name="Bill Murray" size={avatarSize} src={avatarUrl} />
    </AvatarShowcase>

    <h5>Avatar States</h5>
    <Note>
      All states handled internal, thought can also be provided as props.
    </Note>
    <AvatarShowcase description="No state applied" title="Default">
      <Avatar label="default" onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
    <AvatarShowcase
      description="colors.N70A applied as an overlay"
      title="isHover"
    >
      <Avatar isHover onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
    <AvatarShowcase
      description="colors.N70A applied as an overlay, and scaled down to 90%"
      title="isActive"
    >
      <Avatar isActive onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
    <AvatarShowcase
      description="colors.B200 focus ring applied, border-width relative to avatar size"
      title="isFocus"
    >
      <Avatar isFocus onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
    <AvatarShowcase
      description="colors.N200A applied as an overlay"
      title="isSelected"
    >
      <Avatar isSelected onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
    <AvatarShowcase
      description="70% white applied as an overlay"
      title="isDisabled"
    >
      <Avatar isDisabled onClick={() => {}} size="large" src={avatarUrl} />
    </AvatarShowcase>
  </div>
)
