import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';

// tslint:disable-next-line:variable-name
const ListContainer: ComponentClass<
  HTMLAttributes<{}> & { theme?: any }
> = styled.div`
  margin: 0 0;
  box-sizing: border-box;
`;

export default ListContainer;
