//

import GlobalTheme from '@atlaskit/theme'
import React, { PureComponent } from 'react'
import { canUseDOM } from 'exenv'
import { Slot, ShapeGroup, Svg } from '../styled/AvatarImage'

export function DefaultImage({ appearance, size, title, isLoading }) {
  const rectBounds = 128

  return (
    <GlobalTheme.Consumer>
      {({ mode }) => (
        <Svg
          appearance={appearance}
          aria-label={title}
          isLoading={isLoading}
          role="img"
          size={size}
          version="1.1"
          viewBox={`0 0 ${rectBounds} ${rectBounds}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {appearance === 'circle' ? (
            <ShapeGroup mode={mode}>
              <circle cx="64" cy="64" r="64" />
              <g>
                <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
                <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
              </g>
            </ShapeGroup>
          ) : (
            <ShapeGroup mode={mode}>
              <rect height={rectBounds} width={rectBounds} x="0" y="0" />
              <g transform="translate(19.000000, 32.000000)">
                <path d="M18.25,32.5 L54.5833333,32.5 L54.5833333,23.4166667 L18.25,23.4166667 L18.25,32.5 Z M9.16666667,18.8331166 C9.16666667,16.3479549 11.236581,14.3333333 13.7195662,14.3333333 L59.1137671,14.3333333 C61.6282641,14.3333333 63.6666667,16.3815123 63.6666667,18.8331166 L63.6666667,41.5833333 L9.16666667,41.5833333 L9.16666667,18.8331166 Z" />
                <path d="M18.25,9.81383682 C18.25,4.7850061 22.3296003,0.708333333 27.3238554,0.708333333 L36.4261446,0.708333333 C41.4374965,0.708333333 45.5,4.76812825 45.5,9.81383682 L45.5,23.4166667 L18.25,23.4166667 L18.25,9.81383682 Z M36.4166667,9.81383682 C36.4166667,9.79803315 36.4184748,9.79303784 36.4207515,9.79166667 L27.3238554,9.79166667 C27.3447224,9.79166667 27.3333333,9.80308059 27.3333333,9.81383682 L27.3333333,14.3333333 L36.4166667,14.3333333 L36.4166667,9.81383682 Z" />
                <path d="M11.4386532,55.2083333 L74.9953562,55.2083333 L79.5452242,41.5833333 L9.80449752,41.5833333 L11.4386532,55.2083333 Z M0.1048547,36.987541 C-0.192399775,34.5091405 1.5865717,32.5 4.09502839,32.5 L87.6264735,32.5 C90.1274401,32.5 91.5225656,34.393506 90.7231047,36.7875656 L82.9702846,60.004101 C82.1795402,62.3720582 79.5279445,64.2916667 76.9985338,64.2916667 L7.91963924,64.2916667 C5.41227673,64.2916667 3.14113571,62.3029555 2.84143097,59.8041257 L0.1048547,36.987541 Z" />
              </g>
            </ShapeGroup>
          )}
        </Svg>
      )}
    </GlobalTheme.Consumer>
  )
}

let cache = {}

export const clearCache = () => {
  cache = {}
}

export default class AvatarImage extends PureComponent {
  state = {
    hasError: false,
    // if provided a src - we need to load it
    isLoading: Boolean(this.props.src),
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.loadImage()
  }

  // handle case where `src` is modified after mount
  componentWillReceiveProps(nextProps) {
    if (nextProps.src && this.props.src !== nextProps.src) {
      this.setState({ isLoading: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.src && this.props.src !== prevProps.src) {
      this.loadImage()
    }
  }
  componentWillUnmount() {
    this.isComponentMounted = false
  }

  loadImage = () => {
    // nothing to load
    if (!this.props.src) {
      return
    }

    const img = new Image()
    img.onload = this.handleLoadSuccess
    img.onerror = this.handleLoadError
    img.src = this.props.src
  }

  handleLoad = hasError => {
    if (this.isComponentMounted) {
      this.setState({ hasError, isLoading: false })
    }
  }

  handleLoadSuccess = () => {
    if (typeof this.props.src === 'string') {
      cache[this.props.src] = true
    }
    this.handleLoad(false)
  }

  handleLoadError = () => {
    this.handleLoad(true)
  }

  render() {
    const { alt, src, appearance, size } = this.props
    const { hasError, isLoading } = this.state
    const showDefault = !isLoading && (!src || hasError)
    const imageUrl =
      src && (!isLoading || cache[src] || !canUseDOM) ? src : null
    return showDefault ? (
      <DefaultImage
        appearance={appearance}
        isLoading={isLoading}
        size={size}
        title={alt}
      />
    ) : (
      <Slot
        appearance={appearance}
        backgroundImage={imageUrl}
        isLoading={isLoading}
        label={alt}
        role="img"
        size={size}
      />
    )
  }
}
