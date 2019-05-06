//
import React from 'react'
import { gridSize } from '@atlaskit/theme'
import Avatar from '../src'
import { Block, Code, Note } from '../examples-util/helpers'

export default ({ appearance, src }) => (
  <div>
    <h2>Default appearance</h2>
    <Note>
      <Code>medium</Code> size - no <Code>presence</Code>, or
      <Code>status</Code>
    </Note>
    <div style={{ marginTop: gridSize() }}>
      <Avatar appearance={appearance} />
    </div>

    <h2>Presence</h2>
    <h4>Presence Types</h4>
    <Note>
      Supports <Code>busy</Code>, <Code>focus</Code>, <Code>offline</Code>, and
      <Code>online</Code>
    </Note>
    <Block>
      <Avatar appearance={appearance} presence="busy" size="large" src={src} />
      <Avatar appearance={appearance} presence="focus" size="large" src={src} />
      <Avatar
        appearance={appearance}
        presence="offline"
        size="large"
        src={src}
      />
      <Avatar
        appearance={appearance}
        presence="online"
        size="large"
        src={src}
      />
    </Block>

    <h4>All Sizes with Presence</h4>
    <Note>
      Sizes <Code>xsmall</Code> and <Code>xxlarge</Code> do NOT support Presence
    </Note>
    <Block>
      <Avatar appearance={appearance} size="xxlarge" src={src} />
      <Avatar appearance={appearance} presence="busy" size="xlarge" src={src} />
      <Avatar appearance={appearance} presence="focus" size="large" src={src} />
      <Avatar appearance={appearance} presence="offline" src={src} />
      <Avatar
        appearance={appearance}
        presence="online"
        size="small"
        src={src}
      />
      <Avatar appearance={appearance} size="xsmall" src={src} />
    </Block>

    <h2>Status</h2>
    <h4>Status Types</h4>
    <Note>
      Supports <Code>approved</Code>, <Code>declined</Code>, and
      <Code>locked</Code>
    </Note>
    <Block>
      <Avatar
        appearance={appearance}
        size="large"
        src={src}
        status="approved"
      />
      <Avatar
        appearance={appearance}
        size="large"
        src={src}
        status="declined"
      />
      <Avatar appearance={appearance} size="large" src={src} status="locked" />
    </Block>

    <h4>All Sizes with Status</h4>
    <Note>
      Sizes <Code>xsmall</Code> and <Code>xxlarge</Code> do NOT support Status
    </Note>
    <Block>
      <Avatar appearance={appearance} size="xxlarge" src={src} />
      <Avatar
        appearance={appearance}
        size="xlarge"
        src={src}
        status="approved"
      />
      <Avatar
        appearance={appearance}
        size="large"
        src={src}
        status="declined"
      />
      <Avatar appearance={appearance} src={src} status="locked" />
      <Avatar
        appearance={appearance}
        size="small"
        src={src}
        status="declined"
      />
      <Avatar appearance={appearance} size="xsmall" src={src} />
    </Block>
  </div>
)
