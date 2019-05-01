import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const underlineFade = css`
  &:before {
    transition: ${th('transitionDuration')} ease;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }
`

// const underlineGrow = css`
//   &:before {
//     transform: scaleX(0);
//     transition: ${th('transitionDuration')} ease;
//   }

//   &:hover:before {
//     transform: scaleX(1);
//   }
// `

const underlineAnimation = css`
  position: relative;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${th('colorPrimary')};
    visibility: hidden;
  }

  &:hover:before {
    visibility: visible;
  }

  ${underlineFade};
`

const active = css`
  font-weight: normal;

  &:before {
    opacity: 1;
    visibility: visible;
  }
`

export default css`
  ${underlineAnimation};
  ${props => props.active && active};
`
