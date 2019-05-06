//
import React, { PureComponent } from 'react'
import Group, { Heading, HeadingText, HeadingAfter } from '../styled/Group'

class DroplistGroup extends PureComponent {
  state = { ariaLabel: this.props.heading }

  componentDidMount = () => {
    if (this.props.heading || this.props.elemAfter) {
      this.setState({ ariaLabel: this.getAriaLabel() })
    }
  }
  componentDidUpdate = () => {
    if (this.props.heading || this.props.elemAfter) {
      this.setState({ ariaLabel: this.getAriaLabel() })
    }
  }

  getAriaLabel = () => {
    const { elemAfter, heading } = this.props
    const afterText =
      elemAfter && typeof elemAfter === 'string'
        ? elemAfter
        : this.headingElement && this.headingElement.textContent

    return `${heading || ''} ${afterText || ''}`
  }

  render() {
    const { children, elemAfter, heading } = this.props
    const { ariaLabel } = this.state

    return (
      <Group aria-label={ariaLabel} role="group">
        {heading ? (
          <Heading aria-hidden="true" data-role="droplistGroupHeading">
            <HeadingText>{heading}</HeadingText>
            {elemAfter ? (
              <HeadingAfter
                innerRef={r => {
                  this.headingElement = r
                }}
              >
                {elemAfter}
              </HeadingAfter>
            ) : null}
          </Heading>
        ) : null}
        {children}
      </Group>
    )
  }
}

DroplistGroup.displayName = 'Group'
export default DroplistGroup
