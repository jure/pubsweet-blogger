import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

/*
  To disable underline from Logo
*/

export default {
  Root: css`
    box-shadow: 0 0 1px ${th('colorPrimary')};
    margin-bottom: 1px;
  `,
  LogoLink: css`
    &:hover:before {
      visibility: hidden;
    }
  `,
}
