//
import React, { Component } from 'react'
import { Inner, Outer } from '../styled/Icon'
import getPresenceSVG from '../helpers/getPresenceSVG'

export default class Presence extends Component {
  render() {
    const { borderColor, children, presence, size } = this.props

    return (
      <Outer bgColor={borderColor} size={size}>
        <Inner>{children || (presence && getPresenceSVG(presence))}</Inner>
      </Outer>
    )
  }
}
