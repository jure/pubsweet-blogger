//
import styled, { css } from 'styled-components'
import { colors, fontSize, gridSize, math, themed } from '@atlaskit/theme'

const activeBackgroundColor = themed({ light: colors.B75, dark: colors.DN30 })
const hoverBackgroundColor = themed({ light: colors.N20, dark: colors.DN60 })
const selectedBackgroundColor = themed({ light: colors.N0, dark: colors.DN30 })

const activePrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN300,
})
const defaultPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN600,
})
const disabledPrimaryTextColor = themed({
  light: colors.N70,
  dark: colors.DN70,
})
const primaryPrimaryTextColor = themed({
  light: colors.B400,
  dark: colors.B400,
})
const selectedPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.N800,
})

const focusedStyles = css`
  box-shadow: 0 0 0 2px ${themed({ light: colors.B100, dark: colors.B75 })}
    inset;
  outline: none;
  outline-offset: 0;
  position: relative; /* prevents bgcolor of a hovered element from obfuscating focus ring of a focused sibling element */
`

const activeStyles = css`
  &,
  &:hover {
    background-color: ${selectedBackgroundColor};
    color: ${selectedPrimaryTextColor};
  }
`
const primaryStyles = css`
  color: ${primaryPrimaryTextColor};
`

const sharedStyles = props => css`
  align-items: center;
  box-sizing: border-box;
  color: ${
    props.isDisabled ? disabledPrimaryTextColor : defaultPrimaryTextColor
  };
  cursor: ${props.isDisabled ? 'not-allowed' : 'pointer'};
  display: ${props.isHidden ? 'none' : 'flex'};
  flex-wrap: nowrap;
  font-size: ${fontSize}px;
  font-weight: normal;
  padding: 0 ${math.multiply(gridSize, 1.5)}px;
  text-decoration: none;

  &:hover {
    background-color: ${!props.isDisabled && hoverBackgroundColor};
    color: ${
      props.isDisabled ? disabledPrimaryTextColor : defaultPrimaryTextColor
    };
    text-decoration: none;

    ${props.isPrimary && primaryStyles};
  }
  &:active {
    background-color: ${!props.isDisabled && activeBackgroundColor};
    color: ${!props.isDisabled && activePrimaryTextColor};

    ${props.isPrimary && primaryStyles};
  }
  &:focus {
    ${focusedStyles};
  }

  ${props.isFocused && focusedStyles} ${props.isActive &&
  activeStyles} ${props.isPrimary && primaryStyles};
`

export const Anchor = styled.a`
  ${props => sharedStyles(props)};
`
export const Span = styled.span`
  ${props => sharedStyles(props)};
`

// Checkbox/Radio wrapper -- sits left of the children
export const InputWrapper = styled.span`
  display: flex;
  margin: 0 2px;
`

// Elements injected before/after the children
export const Before = styled.span`
  display: flex;
`
export const After = styled.span`
  align-items: center;
  display: flex;
`

// Alignment and layout for the children
export const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin: 0 ${gridSize}px;
  padding: ${gridSize}px 0;
  overflow: hidden;

  &:first-child {
    margin: 0;
  }
`
export const Content = styled.span`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${props =>
    props.allowMultiline &&
    css`
      white-space: normal;
    `};
`

// Description is a block element below the children, like a subtitle
export const Description = styled.span`
  color: ${colors.subtleText};
  flex: 1 1 auto;
  font-size: 12px;
  line-height: 16 / 12;
  margin-top: ${math.divide(gridSize, 2)}px;
`

// NOTE: Exposed as a named export for this package
export const SecondaryText = styled.span`
  color: ${colors.subtleText};
`
