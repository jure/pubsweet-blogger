// @flow

import styled, { css } from 'styled-components';
import { borderRadius, colors, themed, layers } from '@atlaskit/theme';

const backgroundColor = themed({
  light: colors.N800,
  dark: colors.DN0,
});
const textColor = themed({
  light: colors.N0,
  dark: colors.DN600,
});

const truncate = p =>
  p.truncate
    ? css`
        max-width: 420px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `
    : '';

export const TooltipPrimitive = styled.div`
  z-index: ${layers.tooltip};
  pointer-events: none;
  position: fixed;
`;

export const Tooltip = styled(TooltipPrimitive)`
  background-color: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  color: ${textColor};
  font-size: 12px;
  left: 0;
  line-height: 1.3;
  max-width: 240px;
  padding: 2px 6px;
  top: 0;
  /* Edge does not support overflow-wrap */
  word-wrap: break-word;
  overflow-wrap: break-word;
  ${truncate};
`;

// The inline-block here is needed to keep the tooltip appearing in the correct position
// when nested inside a wider parent (see position: relative example).
export const Target = styled.div`
  display: inline-block;
`;
