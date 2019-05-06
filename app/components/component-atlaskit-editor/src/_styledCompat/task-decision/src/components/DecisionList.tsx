import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import ListWrapper from '../styled/ListWrapper';

export interface Props {
  children?: ReactNode;
}

export default class DecisionList extends PureComponent<Props, {}> {
  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    // Data attributes are required for copy and paste from rendered content
    // to preserve the decision
    return (
      <ListWrapper data-decision-list-local-id="">
        {React.Children.map(children, (child, idx) => (
          <li key={idx} data-decision-local-id="" data-decision-state="DECIDED">
            {child}
          </li>
        ))}
      </ListWrapper>
    );
  }
}
