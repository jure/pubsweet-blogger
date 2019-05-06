import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { borderRadius, gridSize, colors, themed } from '@atlaskit/theme';

const akGridSize = gridSize();

export const ContentWrapper: ComponentClass<
  HTMLAttributes<{}> & { innerRef?: any }
> = styled.div`
  margin: 0;
  word-wrap: break-word;
  min-width: 0;
  flex: 1 1 auto;
`;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: row;

  line-height: 20px;
  border-radius: ${borderRadius()}px;
  margin: ${akGridSize}px 0;
  padding: ${akGridSize}px ${akGridSize}px;
  min-height: 36px;
  box-sizing: border-box;
  box-shadow: none;

  &:hover {
    box-shadow: none;
    transition: box-shadow 0.2s ease-in-out;
  }

  background-color: ${themed({ light: colors.N30A, dark: colors.DN50 })};
  border: 1px solid: ${themed({ light: 'none', dark: colors.DN60 })};
`;

export const ParticipantWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  margin: -2px 8px;
`;

export const AttributionWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  color: ${colors.N200};
  margin-top: ${akGridSize}px;
  font-size: 12px;
  font-weight: 500;
`;
