//
import React from 'react'
import Avatar from '../src'
import { Block, Gap } from '../examples-util/helpers'

export default () => (
  <div>
    <Block heading="Circle">
      <Avatar name="xxlarge" size="xxlarge" />
      <Gap />
      <Avatar name="xlarge" presence="online" size="xlarge" />
      <Gap />
      <Avatar name="large" presence="offline" size="large" />
      <Gap />
      <Avatar name="medium" presence="busy" size="medium" />
      <Gap />
      <Avatar name="small" presence="focus" size="small" />
      <Gap />
      <Avatar name="xsmall" size="xsmall" />
    </Block>
    <Block heading="Square">
      <Avatar appearance="square" name="xxlarge" size="xxlarge" />
      <Gap />
      <Avatar
        appearance="square"
        name="xlarge"
        size="xlarge"
        status="approved"
      />
      <Gap />
      <Avatar appearance="square" name="large" size="large" status="declined" />
      <Gap />
      <Avatar appearance="square" name="medium" size="medium" status="locked" />
      <Gap />
      <Avatar appearance="square" name="small" size="small" />
      <Gap />
      <Avatar appearance="square" name="xsmall" size="xsmall" />
    </Block>
  </div>
)
