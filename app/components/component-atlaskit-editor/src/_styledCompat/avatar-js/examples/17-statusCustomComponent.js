//
import React from 'react'
import styled from 'styled-components'
import Avatar from '../src'
import { Block } from '../examples-util/helpers'

const DivPresence = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  font-size: 0.75em;
  font-weight: 500;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
`

export default () => (
  <Block heading="Custom div as status">
    <Avatar
      appearance="square"
      size="xxlarge"
      status={<DivPresence>1</DivPresence>}
    />
    <Avatar
      appearance="square"
      size="xlarge"
      status={<DivPresence>1</DivPresence>}
    />
    <Avatar
      appearance="square"
      size="large"
      status={<DivPresence>1</DivPresence>}
    />
    <Avatar
      appearance="square"
      size="medium"
      status={<DivPresence>1</DivPresence>}
    />
    <Avatar
      appearance="square"
      size="small"
      status={<DivPresence>1</DivPresence>}
    />
    <Avatar
      appearance="square"
      size="xsmall"
      status={<DivPresence>1</DivPresence>}
    />
  </Block>
)
