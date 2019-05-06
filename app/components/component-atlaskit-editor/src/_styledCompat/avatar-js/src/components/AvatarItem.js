//

import GlobalTheme from '@atlaskit/theme'
import React, { cloneElement, Component } from 'react'
import { propsOmittedFromClickData } from './constants'
import { omit } from '../utils'
import {
  getBackgroundColor,
  Content,
  PrimaryText,
  SecondaryText,
} from '../styled/AvatarItem'
import { getProps, getStyledAvatarItem } from '../helpers'
import { withPseudoState } from '../hoc'
import { ThemeItem } from '../theme/item'

/* eslint-disable react/no-unused-prop-types */

class AvatarItem extends Component {
  static defaultProps = {
    enableTextTruncate: true,
  }

  // expose blur/focus to consumers via ref
  blur = () => {
    if (this.node) this.node.blur()
  }
  focus = () => {
    if (this.node) this.node.focus()
  }

  // disallow click on disabled avatars
  guardedClick = event => {
    const { isDisabled, onClick } = this.props

    if (isDisabled || typeof onClick !== 'function') return

    const item = omit(this.props, ...propsOmittedFromClickData)

    onClick({ item, event })
  }

  // setNode = ref => {
  //   this.node = ref
  // }

  render() {
    const {
      avatar,
      enableTextTruncate,
      primaryText,
      secondaryText,
    } = this.props

    // distill props from context, props, and state
    const enhancedProps = getProps(this)

    // provide element type based on props
    const StyledComponent = getStyledAvatarItem(this.props)

    return (
      <GlobalTheme.Consumer>
        {({ mode }) => (
          <ThemeItem.Provider value={this.props.theme}>
            <ThemeItem.Consumer>
              {tokens => {
                // maintain the illusion of a mask around presence/status
                const borderColor = getBackgroundColor({
                  ...this.props,
                  ...tokens,
                  mode,
                })

                return (
                  <StyledComponent
                    // innerRef={this.setNode}
                    {...enhancedProps}
                    onClick={this.guardedClick}
                  >
                    {cloneElement(avatar, { borderColor })}
                    <Content truncate={enableTextTruncate}>
                      <PrimaryText truncate={enableTextTruncate}>
                        {primaryText}
                      </PrimaryText>
                      <SecondaryText truncate={enableTextTruncate}>
                        {secondaryText}
                      </SecondaryText>
                    </Content>
                  </StyledComponent>
                )
              }}
            </ThemeItem.Consumer>
          </ThemeItem.Provider>
        )}
      </GlobalTheme.Consumer>
    )
  }
}

export default withPseudoState(AvatarItem)
