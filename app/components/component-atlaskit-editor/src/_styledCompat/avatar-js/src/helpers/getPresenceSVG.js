//

import { colors, themed, withTheme } from '@atlaskit/theme'
import React from 'react'
import styled from 'styled-components'

const Svg = props => (
  <svg
    height="100%"
    version="1.1"
    viewBox="0 0 8 8"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
)

const BusyCircle = withTheme(styled.circle`
  fill: ${themed({ light: colors.R300, dark: colors.R200 })};
`)
const BusyPath = withTheme(styled.path`
  fill: ${colors.background};
`)
const FocusPath = withTheme(styled.path`
  fill: ${colors.purple};
`)
const OfflineOuter = withTheme(styled.path`
  fill: ${themed({ light: colors.N200, dark: colors.DN100 })};
`)
const OfflineInner = withTheme(styled.path`
  fill: ${themed({ light: colors.N40, dark: colors.DN500 })};
`)
const OnlineCircle = withTheme(styled.circle`
  fill: ${themed({ light: colors.G300, dark: colors.G200 })};
`)

export default function getPresenceSvg(presence) {
  switch (presence) {
    case 'busy':
      return (
        <Svg>
          <BusyCircle cx="4" cy="4" r="4" />
          <BusyPath d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" />
        </Svg>
      )
    case 'focus':
      return (
        <Svg>
          <FocusPath d="M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z M4,6.66666667 C5.47275933,6.66666667 6.66666667,5.47275933 6.66666667,4 C6.66666667,2.52724067 5.47275933,1.33333333 4,1.33333333 C2.52724067,1.33333333 1.33333333,2.52724067 1.33333333,4 C1.33333333,5.47275933 2.52724067,6.66666667 4,6.66666667 Z M4,5.33333333 C3.26362033,5.33333333 2.66666667,4.73637967 2.66666667,4 C2.66666667,3.26362033 3.26362033,2.66666667 4,2.66666667 C4.73637967,2.66666667 5.33333333,3.26362033 5.33333333,4 C5.33333333,4.73637967 4.73637967,5.33333333 4,5.33333333 Z" />
        </Svg>
      )
    case 'offline':
      return (
        <Svg>
          <OfflineOuter d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
          <OfflineInner d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
        </Svg>
      )
    case 'online':
      return (
        <Svg>
          <OnlineCircle cx="4" cy="4" r="4" />
        </Svg>
      )
    default:
      return null
  }
}
