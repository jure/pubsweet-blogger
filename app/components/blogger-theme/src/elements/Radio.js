import { css, keyframes } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const checking = keyframes`
  0% {
    transform: scale(0.8);
  }
  20% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`
export default {
  Root: css`
    transition: all ${th('transitionDuration')};

    &:hover {
      span {
        color: ${props =>
          props.checked ? 'inherit' : props.theme.colorPrimary};

        &:before {
          animation-name: ${props => (props.checked ? 'none' : checking)};
          animation-duration: ${th('transitionDuration')};
          box-shadow: 0 0 0 ${th('borderWidth')}
            ${props =>
              props.checked ? 'currentColor' : props.theme.colorPrimary};
        }
      }
    }
  `,
  Label: css`
    font-style: italic;

    &:before {
      content: ' ';
      display: inline-block;
      vertical-align: middle;
      width: calc(${th('gridUnit')} * 2);
      height: calc(${th('gridUnit')} * 2);
      margin-left: ${th('gridUnit')};
      margin-right: ${th('gridUnit')};

      /* This is not a real border (box-shadow provides that), so not themed as such */
      border: calc(${th('gridUnit')} / 4) solid white;
      border-radius: 50%;

      transition: border ${th('transitionDuration')}
        ${th('transitionTimingFunction')};
      color: ${props => (props.color ? props.color : props.theme.colorText)};
      background: ${props => (props.checked ? 'currentColor' : 'transparent')};
      box-shadow: 0 0 0 ${th('borderWidth')} currentColor;
    }
  `,
  Input: css`
    position: absolute;
    opacity: 0;
    z-index: -1;

    &:focus + span:before {
      box-shadow: 0 0 ${th('borderWidth')} calc(${th('borderWidth')} * 2)
        ${th('colorPrimary')};
    }
  `,
}
