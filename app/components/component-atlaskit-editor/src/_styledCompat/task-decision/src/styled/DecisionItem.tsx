import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { gridSize, colors, themed } from '@atlaskit/theme';

export interface EditorIconWrapperProps {
  showPlaceholder?: boolean;
}

// tslint:disable-next-line:variable-name
export const EditorIconWrapper: ComponentClass<
  HTMLAttributes<{}> & EditorIconWrapperProps
> = styled.span`
  flex: 0 0 16px;
  height: 16px;
  width: 16px;
  color: ${(props: EditorIconWrapperProps) =>
    props.showPlaceholder
      ? colors.N100
      : themed({ light: colors.G300, dark: colors.G200 })};
  margin: 2px ${gridSize}px 0 0;

  > span {
    margin: -8px;
  }
`;
