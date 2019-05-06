//
import React from 'react'

import styled from 'styled-components'
import { colors, math, gridSize } from '@atlaskit/theme'

const Wrapper = styled.div`
  margin-top: ${gridSize}px;
`

const ChildrenWrapper = styled.div`
  align-items: baseline;
  color: ${colors.text};
  display: flex;

  > * {
    margin-right: ${gridSize}px;
  }
`

export const Note = styled.p`
  color: ${colors.N100};
  font-size: ${props => (props.size === 'large' ? '1.15em' : '0.9rem')};
  margin-top: ${math.divide(gridSize, 2)}px;
  margin-bottom: ${math.multiply(gridSize, 2)}px;
`

export const Code = styled.code`
  background-color: ${colors.R50};
  border-radius: 0.2em;
  color: ${colors.R400};
  font-size: 0.85em;
  line-height: 1.1;
  padding: 0.1em 0.4em;
`

export const Gap = styled.span`
  margin-right: ${gridSize}px;
`

export const ShrinkWrap = styled(Gap)`
  height: ${math.multiply(gridSize, 3)}px;
  width: ${math.multiply(gridSize, 3)}px;
`
export const Heading = styled.div`
  color: ${colors.subtleHeading};
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`

export const Block = ({ children, heading }) => (
  <Wrapper>
    {heading ? <Heading>{heading}</Heading> : null}
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Wrapper>
)
