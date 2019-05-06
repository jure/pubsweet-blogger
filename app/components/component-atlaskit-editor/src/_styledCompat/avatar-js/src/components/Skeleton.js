//

import React, { Component } from 'react'
import StyledSkeleton from '../styled/Skeleton'

export default class Skeleton extends Component {
  static defaultProps = {
    appearance: 'circle',
    size: 'medium',
    weight: 'normal',
  }

  render() {
    return <StyledSkeleton {...this.props} />
  }
}
