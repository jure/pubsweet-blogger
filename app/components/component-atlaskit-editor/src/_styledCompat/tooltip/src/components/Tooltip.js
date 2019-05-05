import React, { Children, Component, Fragment } from 'react'
import NodeResolver from 'react-node-resolver'
import flushable from 'flushable'
import { Popper } from '@atlaskit/popper'
import Portal from '@atlaskit/portal'
import { layers } from '@atlaskit/theme'

import { Tooltip as StyledTooltip } from '../styled'
import Animation from './Animation'

const SCROLL_OPTIONS = { capture: true, passive: true }

function getMousePosition(mouseCoordinates) {
  const safeMouse = mouseCoordinates || { top: 0, left: 0 }
  const getBoundingClientRect = () => ({
    top: safeMouse.top,
    left: safeMouse.left,
    bottom: safeMouse.top,
    right: safeMouse.left,
    width: 0,
    height: 0,
  })
  return {
    getBoundingClientRect,
    clientWidth: 0,
    clientHeight: 0,
  }
}

let pendingHide

const showTooltip = (fn, defaultDelay) => {
  const isHidePending = pendingHide && pendingHide.pending()
  if (isHidePending) {
    pendingHide.flush()
  }
  const pendingShow = flushable(
    () => fn(isHidePending),
    isHidePending ? 0 : defaultDelay,
  )
  return pendingShow.cancel
}

const hideTooltip = (fn, defaultDelay) => {
  pendingHide = flushable(flushed => fn(flushed), defaultDelay)
  return pendingHide.cancel
}

class Tooltip extends Component {
  static defaultProps = {
    component: StyledTooltip,
    delay: 300,
    mousePosition: 'bottom',
    position: 'bottom',
    tag: 'div',
  }

  cancelPendingSetState = () => {} // set in mouseover/mouseout handlers
  state = {
    immediatelyHide: false,
    immediatelyShow: false,
    isVisible: false,
    renderTooltip: false,
  }

  componentWillUnmount() {
    this.cancelPendingSetState()
    this.removeScrollListener()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isVisible && this.state.isVisible) {
      if (this.props.onShow) this.props.onShow()

      window.addEventListener('scroll', this.handleWindowScroll, SCROLL_OPTIONS)
    } else if (prevState.isVisible && !this.state.isVisible) {
      if (this.props.onHide) this.props.onHide()
      this.removeScrollListener()
    }
  }

  removeScrollListener() {
    window.removeEventListener(
      'scroll',
      this.handleWindowScroll,
      SCROLL_OPTIONS,
    )
  }

  handleWindowScroll = () => {
    if (this.state.isVisible) {
      this.cancelPendingSetState()
      this.setState({ isVisible: false, immediatelyHide: true })
    }
  }

  handleMouseClick = () => {
    if (this.props.hideTooltipOnClick) {
      this.cancelPendingSetState()
      this.setState({ isVisible: false, immediatelyHide: true })
    }
  }

  handleMouseDown = () => {
    if (this.props.hideTooltipOnMouseDown) {
      this.cancelPendingSetState()
      this.setState({ isVisible: false, immediatelyHide: true })
    }
  }

  handleMouseOver = e => {
    if (e.target === this.wrapperRef) return
    // In the case where a tooltip is newly rendered but immediately becomes hovered,
    // we need to set the coordinates in the mouseOver event.
    if (!this.fakeMouseElement)
      this.fakeMouseElement = getMousePosition({
        left: e.clientX,
        top: e.clientY,
      })
    this.cancelPendingSetState()
    if (Boolean(this.props.content) && !this.state.isVisible) {
      this.cancelPendingSetState = showTooltip(immediatelyShow => {
        this.setState({
          isVisible: true,
          renderTooltip: true,
          immediatelyShow,
        })
      }, this.props.delay)
    }
  }

  handleMouseLeave = e => {
    if (e.target === this.wrapperRef) return
    this.cancelPendingSetState()
    if (this.state.isVisible) {
      this.cancelPendingSetState = hideTooltip(immediatelyHide => {
        this.setState({ isVisible: false, immediatelyHide })
      }, this.props.delay)
    }
  }

  // Update mouse coordinates, used when position is 'mouse'.
  // We are not debouncing/throttling this function because we aren't causing any
  // re-renders or performaing any intensive calculations, we're just updating a value.
  // React also doesn't play nice debounced DOM event handlers because they pool their
  // SyntheticEvent objects. Need to use event.persist as a workaround - https://stackoverflow.com/a/24679479/893630
  handleMouseMove = event => {
    if (!this.state.renderTooltip) {
      this.fakeMouseElement = getMousePosition({
        left: event.clientX,
        top: event.clientY,
      })
    }
  }

  render() {
    const {
      children,
      content,
      position,
      mousePosition,
      truncate,
      component: TooltipContainer,
      tag: TargetContainer,
    } = this.props
    const {
      isVisible,
      renderTooltip,
      immediatelyShow,
      immediatelyHide,
    } = this.state
    return (
      <Fragment>
        <TargetContainer
          onClick={this.handleMouseClick}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseLeave}
          onMouseOver={this.handleMouseOver}
          ref={wrapperRef => {
            this.wrapperRef = wrapperRef
          }}
        >
          <NodeResolver
            innerRef={targetRef => {
              this.targetRef = targetRef
            }}
          >
            {Children.only(children)}
          </NodeResolver>
        </TargetContainer>
        {renderTooltip && this.targetRef && this.fakeMouseElement ? (
          <Portal zIndex={layers.tooltip()}>
            <Popper
              placement={position === 'mouse' ? mousePosition : position}
              referenceElement={
                // https://github.com/FezVrasta/react-popper#usage-without-a-reference-htmlelement
                // We are using a popper technique to pass in a faked element when we use mouse.
                // This is fine.
                // $FlowFixMe
                position === 'mouse' ? this.fakeMouseElement : this.targetRef
              }
            >
              {({ ref, style, placement }) => (
                <Animation
                  immediatelyHide={immediatelyHide}
                  immediatelyShow={immediatelyShow}
                  in={isVisible}
                  onExited={() => this.setState({ renderTooltip: false })}
                >
                  {getAnimationStyles => (
                    <TooltipContainer
                      ref={ref}
                      style={{
                        ...getAnimationStyles(placement),
                        ...style,
                      }}
                      truncate={truncate}
                    >
                      {content}
                    </TooltipContainer>
                  )}
                </Animation>
              )}
            </Popper>
          </Portal>
        ) : null}
      </Fragment>
    )
  }
}

export { Tooltip as TooltipWithoutAnalytics }

export default Tooltip
