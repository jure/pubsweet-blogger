//
import React, { Component } from 'react'
import { omit, getDisplayName } from '../utils'

const INTERNAL_HANDLERS = [
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseUp',
]

export default function withPseudoState(WrappedComponent) {
  return class ComponentWithPseudoState extends Component {
    static displayName = getDisplayName('withPseudoState', WrappedComponent)

    componentWillMount() {
      const { href, isInteractive, onClick } = this.props

      if (href || isInteractive || onClick) {
        this.actionKeys = onClick || isInteractive ? ['Enter', ' '] : ['Enter']
      }
    }

    state = {
      isActive: Boolean(this.props.isActive),
      isFocus: Boolean(this.props.isActive),
      isHover: Boolean(this.props.isActive),
      isInteractive: Boolean(
        this.props.href || this.props.isInteractive || this.props.onClick,
      ),
    }

    // expose blur/focus to consumers via ref
    blur = () => {
      if (this.component && this.component.blur) this.component.blur()
    }
    focus = () => {
      if (this.component && this.component.focus) this.component.focus()
    }

    setComponent = component => {
      this.component = component
    }

    onBlur = () => this.setState({ isActive: false, isFocus: false })
    onFocus = () => this.setState({ isFocus: true })
    onMouseLeave = () => this.setState({ isActive: false, isHover: false })
    onMouseEnter = () => this.setState({ isHover: true })
    onMouseUp = () => this.setState({ isActive: false })
    onMouseDown = () => this.setState({ isActive: true })

    onKeyDown = event => {
      if (this.actionKeys.indexOf(event.key) > -1) {
        this.setState({ isActive: true })
      }
    }
    onKeyUp = event => {
      if (this.actionKeys.indexOf(event.key) > -1) {
        this.setState({ isActive: false })
      }
    }

    getProps = () => {
      const { isInteractive } = this.state

      // strip the consumer's handlers off props, then merge with our handlers
      // if the element is interactive
      // We cannot properly type omit because of the inability to convert from
      // an array to a union of the array's items. See https://github.com/facebook/flow/issues/961
      // if you want to learn more about this
      // $FlowFixMe
      const props = omit(this.props, ...INTERNAL_HANDLERS)

      const self = this

      if (isInteractive) {
        INTERNAL_HANDLERS.forEach(handler => {
          if (this.props[handler]) {
            props[handler] = (...args) => {
              self[handler](...args)
              this.props[handler](...args)
            }
          } else {
            props[handler] = self[handler]
          }
        })
      }

      return props
    }

    render() {
      return (
        <WrappedComponent
          ref={this.setComponent}
          {...this.state}
          {...this.getProps()}
        />
      )
    }
  }
}
