//
import { itemThemeNamespace } from '@atlaskit/item'
import { colors, gridSize, math, themed } from '@atlaskit/theme'

const dropdownPadding = {
  bottom: gridSize,
  left: math.multiply(gridSize, 1.5),
  right: math.multiply(gridSize, 1.5),
  top: gridSize,
}

const droplistItemTheme = {
  padding: {
    default: dropdownPadding,
    compact: dropdownPadding,
  },
  borderRadius: () => 0,
  default: {
    background: themed({ light: colors.N0, dark: colors.DN50 }),
    text: themed({ light: colors.N800, dark: colors.DN600 }),
    secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
  },
  hover: {
    background: themed({ light: colors.N20, dark: colors.DN70 }),
    text: themed({ light: colors.N800, dark: colors.DN600 }),
    secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
  },
  active: {
    background: themed({ light: colors.B75, dark: colors.B75 }),
    text: themed({ light: colors.N800, dark: colors.B400 }),
    secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
  },
  selected: {
    background: 'transparent',
    text: themed({ light: colors.N800, dark: colors.DN600 }),
    secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
  },
  disabled: {
    background: 'transparent',
    text: themed({ light: colors.N70, dark: colors.DN80 }),
    secondaryText: themed({ light: colors.N50, dark: colors.DN70 }),
  },
  focus: {
    outline: themed({ light: colors.B100, dark: colors.B75 }),
  },
}

export default {
  [itemThemeNamespace]: droplistItemTheme,
}
