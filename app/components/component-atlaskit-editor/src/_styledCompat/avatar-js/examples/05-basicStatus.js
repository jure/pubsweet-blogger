//
import React from 'react'
import { Status } from '../src'
import { Block, ShrinkWrap } from '../examples-util/helpers'

export default () => (
  <Block>
    <ShrinkWrap>
      <Status status="approved" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Status status="declined" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Status status="locked" />
    </ShrinkWrap>
  </Block>
)
