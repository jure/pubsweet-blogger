//
import styled from 'styled-components'
import { colors, withTheme } from '@atlaskit/theme'
import { BORDER_WIDTH } from './constants'

// set fallbacks for border color/width to protect consumers from invalid values
export const Outer = withTheme(styled.span`
  align-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || colors.background};
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: ${({ size }) => BORDER_WIDTH[size] || BORDER_WIDTH.medium}px;
  width: 100%;
`)

export const Inner = styled.span`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;
`
