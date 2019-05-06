import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, OlHTMLAttributes, ComponentClass } from 'react';

const ListWrapper: ComponentClass<OlHTMLAttributes<{}>> = styled.ol`
  list-style-type: none;
  padding-left: 0;
`;

export default ListWrapper;
