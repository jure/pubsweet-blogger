//
import React from 'react'
import styled from 'styled-components'
import tickInlineSvg from '../examples-util/tick.svg'
import WithAllAvatarSizes from '../examples-util/withAllAvatarSizes'

// the raw tick svg is wrapped in " quotation marks so we will clean it:

const cleanTickInlineSvg = tickInlineSvg.replace(/"/g, '')

const Tick = () => (
  <img
    alt="tick"
    role="presentation"
    src={cleanTickInlineSvg}
    style={{ height: '100%', width: '100%' }}
  />
)

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
  <div>
    <p>
      You are able to provide a react element to the <code>presence</code>{' '}
      property. For best results, it is recommended that whatever you pass in is
      square and has its height and width set to 100%
    </p>
    <h4>SVG</h4>
    <p>Using a custom svg as the presence</p>
    <WithAllAvatarSizes presence={<Tick />} />
    <WithAllAvatarSizes appearance="square" presence={<Tick />} />
    <h4>Your own component</h4>
    <p>This example shows using a styled div as a presence.</p>
    <WithAllAvatarSizes presence={<DivPresence>1</DivPresence>} />
    <WithAllAvatarSizes
      appearance="square"
      presence={<DivPresence>1</DivPresence>}
    />
  </div>
)
