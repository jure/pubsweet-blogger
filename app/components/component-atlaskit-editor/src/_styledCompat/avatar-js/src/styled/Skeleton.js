//

import styled from 'styled-components'

import { AVATAR_SIZES, AVATAR_RADIUS, BORDER_WIDTH } from './constants'

export default styled.div`
  width: ${({ size }) => AVATAR_SIZES[size]}px;
  height: ${({ size }) => AVATAR_SIZES[size]}px;
  display: inline-block;
  border-radius: ${props =>
    props.appearance === 'square' ? `${AVATAR_RADIUS[props.size]}px` : '50%'};
  background-color: ${({ color }) => color || 'currentColor'};
  border: ${({ size }) => BORDER_WIDTH[size]}px solid transparent;
  opacity: ${({ weight }) => (weight === 'strong' ? 0.3 : 0.15)};
`
