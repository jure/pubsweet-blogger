//

import { colors, createTheme, gridSize } from '@atlaskit/theme'

const gridSizeValue = gridSize()

const AVATAR_SIZES = {
  xsmall: gridSizeValue * 2,
  small: gridSizeValue * 3,
  medium: gridSizeValue * 4,
  large: gridSizeValue * 5,
  xlarge: gridSizeValue * 12,
  xxlarge: gridSizeValue * 16,
}

// border radius only applies to "square" avatars
const AVATAR_RADIUS = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12,
}

const BORDER_WIDTH = {
  xsmall: 2,
  small: 2,
  medium: 2,
  large: 2,
  xlarge: 2,
  xxlarge: 2,
}

const ICON_SIZES = {
  xsmall: 0,
  small: 12,
  medium: 14,
  large: 15,
  xlarge: 18,
  xxlarge: 0,
}

const ICON_OFFSET = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 1,
  xlarge: 7,
  xxlarge: 0,
}

const SQUARE_ICON_OFFSET = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 0,
  xlarge: 1,
  xxlarge: 0,
}

function getBackgroundColor(props) {
  const backgroundColors = {
    light: colors.N40,
    dark: colors.DN50,
  }
  return props.isLoading ? backgroundColors[props.mode] : 'transparent'
}

function getBorderRadius(props) {
  const borderWidth = props.includeBorderWidth ? BORDER_WIDTH[props.size] : 0
  const borderRadius =
    props.appearance === 'circle'
      ? '50%'
      : `${AVATAR_RADIUS[props.size] + borderWidth}px`
  return borderRadius
}

function getDimensions(props) {
  const borderWidth = props.includeBorderWidth
    ? BORDER_WIDTH[props.size] * 2
    : 0
  const size = AVATAR_SIZES[props.size] + borderWidth
  const width = `${size}px`
  const height = width
  return { height, width }
}

const getPresenceLayout = props => {
  const presencePosition =
    props.appearance === 'square'
      ? -(BORDER_WIDTH[props.size] * 2)
      : ICON_OFFSET[props.size]
  const presenceSize = ICON_SIZES[props.size]

  return {
    bottom: `${presencePosition}px`,
    height: `${presenceSize}px`,
    right: `${presencePosition}px`,
    width: `${presenceSize}px`,
  }
}

const getStatusLayout = props => {
  const statusPosition =
    props.appearance === 'square'
      ? SQUARE_ICON_OFFSET[props.size]
      : ICON_OFFSET[props.size]
  const statusSize = ICON_SIZES[props.size]

  return {
    height: `${statusSize}px`,
    right: `${statusPosition}px`,
    top: `${statusPosition}px`,
    width: `${statusSize}px`,
  }
}

const propsDefaults = {
  appearance: 'circle',
  includeBorderWidth: false,
  isLoading: false,
  mode: 'light',
  presence: 'offline',
  size: 'xsmall',
}

export const Theme = createTheme(props => {
  const propsWithDefaults = { ...propsDefaults, ...props }
  return {
    backgroundColor: getBackgroundColor(propsWithDefaults),
    borderRadius: getBorderRadius(propsWithDefaults),
    dimensions: getDimensions(propsWithDefaults),
    presence: getPresenceLayout(propsWithDefaults),
    status: getStatusLayout(propsWithDefaults),
  }
})
