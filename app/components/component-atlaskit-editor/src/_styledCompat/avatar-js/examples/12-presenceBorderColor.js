//
import React from 'react'
import styled from 'styled-components'
import { gridSize } from '@atlaskit/theme'
import { Presence } from '../src'

const Container = styled.div`
  display: flex;
`

const PresenceWrapper = styled.div`
  height: 30px;
  width: 30px;
  margin-right: ${gridSize}px;
`

export default () => (
  <div>
    <h3>Custom background color</h3>
    <p>
      By default presences will display a white border. This can be overridden
      with the
      <code>borderColor</code> property.
    </p>
    <p>
      The <code>borderColor</code> property will accept any string that CSS
      border-color can e.g. hex, rgba, transparent, etc.
    </p>
    <Container>
      <PresenceWrapper>
        <Presence presence="online" />
      </PresenceWrapper>

      <PresenceWrapper>
        <Presence borderColor="rebeccapurple" presence="busy" />
      </PresenceWrapper>

      <PresenceWrapper>
        <Presence borderColor="rgba(0, 0, 255, 0.2)" presence="offline" />
      </PresenceWrapper>

      <PresenceWrapper>
        <Presence borderColor="transparent" presence="focus" />
      </PresenceWrapper>
    </Container>
  </div>
)
