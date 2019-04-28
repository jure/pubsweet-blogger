// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { colors, Color } from './utils';

const telepointerColorStyle = (color: Color, index: number) => `
  &.color-${index} {
    background-color: ${color.selection};
    &::after {
      background-color: ${color.solid};
      color: #fff;
      border-color: ${color.solid};
    }
  }
`;

export const telepointerStyle = css`
  .ProseMirror .telepointer {
    position: relative;
    transition: opacity 200ms;

    &.telepointer-selection {
      line-height: 1.2;
      pointer-events: none;
      user-select: none;
    }

    &.telepointer-selection-badge::after {
      content: attr(data-initial);
      position: absolute;
      display: block;
      top: -14px;
      font-size: 9px;
      padding: 2px;
      color: white;
      left: -1px;
      border-radius: 2px 2px 2px 0;
      line-height: initial;
    }

    &.telepointer-dim {
      opacity: 0.2;
    }

    ${colors.map((color, index) => telepointerColorStyle(color, index))};
  }
`;
