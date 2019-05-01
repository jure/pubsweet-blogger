import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

export default {
  // TODO
  // -- input padding: breaking the grid?
  // -- small placeholder text? maybe by default?
  Input: css`
    border-color: ${props => {
      switch (props.validationStatus) {
        case 'success':
          return props.theme.colorSuccess
        case 'warning':
          return props.theme.colorWarning
        case 'error':
          return props.theme.colorError
        default:
          return props.theme.colorBorder
      }
    }};
    color: ${props => {
      switch (props.validationStatus) {
        case 'success':
          return props.theme.colorSuccess
        case 'warning':
          return props.theme.colorWarning
        case 'error':
          return props.theme.colorError
        default:
          return 'inherit'
      }
    }};
    outline: 0;
    padding: 0 0 0 2px;
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};

    &:focus {
      border-color: ${th('colorPrimary')};
      color: inherit;
    }

    &::placeholder {
      font-size: ${th('fontSizeBaseSmall')};
      line-height: ${th('lineHeightBaseSmall')};
    }
  `,
}
