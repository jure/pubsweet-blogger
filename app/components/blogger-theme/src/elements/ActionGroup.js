import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

export default {
  Root: css`
    > * {
      &:last-child {
        border-right: 0;
      }
    }
  `,
  ActionWrapper: css`
    border-right: 1px solid ${th('colorPrimary')};
  `,
}
