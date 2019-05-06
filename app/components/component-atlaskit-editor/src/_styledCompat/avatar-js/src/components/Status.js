//

import React, { Component } from 'react'
import { Inner, Outer } from '../styled/Icon'
import getStatusSVG from '../helpers/getStatusSVG'

export default class Status extends Component {
  render() {
    const { borderColor, children, status, size } = this.props

    return (
      <Outer bgColor={borderColor} size={size}>
        <Inner>{children || (status && getStatusSVG(status))}</Inner>
      </Outer>
    )
  }
}
