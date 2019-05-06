import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { colors, gridSize } from '@atlaskit/theme';

export const Placeholder: ComponentClass<HTMLAttributes<{}>> = styled.span`
  margin: 0 0 0 ${gridSize() * 3}px;
  position: absolute;
  color: ${colors.N80};
  pointer-events: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 50px);
`;
