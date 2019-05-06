//

import React from 'react'
import styled from 'styled-components'
import { colors, themed, withTheme } from '@atlaskit/theme'
import { Theme } from '../theme'

export const ShapeGroup = withTheme(styled.g`
  & circle,
  & rect {
    fill: ${themed({ light: colors.N50, dark: colors.DN100 })};
  }
  & g {
    fill: ${colors.background};
  }
`)

export const Slot = ({
  isLoading,
  appearance,
  size,
  backgroundImage,
  label,
  role,
}) => (
  <Theme.Consumer appearance={appearance} isLoading={isLoading} size={size}>
    {({ backgroundColor, borderRadius }) => (
      <span
        aria-label={label}
        role={role}
        style={{
          backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius,
          display: 'flex',
          flex: '1 1 100%',
          height: '100%',
          width: '100%',
        }}
      />
    )}
  </Theme.Consumer>
)

export const Svg = ({
  appearance,
  size,
  children,
  isLoading,
  ...otherProps
}) => (
  <Theme.Consumer appearance={appearance} isLoading={isLoading} size={size}>
    {({ backgroundColor, borderRadius }) => (
      <svg
        style={{
          backgroundColor,
          borderRadius,
          height: '100%',
          width: '100%',
        }}
        {...otherProps}
      >
        {children}
      </svg>
    )}
  </Theme.Consumer>
)
