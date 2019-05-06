//
import styled from 'styled-components'
import { colors, gridSize, math, themed } from '@atlaskit/theme'

export default styled.div`
  box-sizing: border-box;
  display: block;
  margin-top: ${gridSize}px;

  &:first-child {
    margin-top: 0;
  }
`

export const Heading = styled.div`
  align-items: baseline;
  color: ${themed({
    light: colors.N300,
    dark: colors.DN300,
  })};
  display: flex;
  flex: 1 1 auto;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: ${gridSize}px ${math.multiply(gridSize, 1.5)}px;
`
export const HeadingAfter = styled.div`
  flex: 0 0 auto;
`
export const HeadingText = styled.div`
  flex: 1 1 auto;
  font-size: 12px;
  text-transform: uppercase;
`
