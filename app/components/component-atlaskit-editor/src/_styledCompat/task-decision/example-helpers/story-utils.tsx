import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';

import { taskDecision } from '@atlaskit/util-data-test';

export const { getMockTaskDecisionResource, document } = taskDecision;

export const Grid: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Item: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  flex: 1 1 0;
  margin: 10px;
`;

export const dumpRef = (ref: HTMLElement | null) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

export const action = (action: string) => () => {
  // tslint:disable-next-line:no-console
  console.log({ action });
};

interface Props {
  render: (
    taskStates: Map<string, boolean>,
    onChangeListener: (taskId: string, done: boolean) => void,
  ) => JSX.Element;
}

interface State {
  tick: number;
}

export class TaskStateManager extends PureComponent<Props, State> {
  private taskStates = new Map<string, boolean>();

  constructor(props: Props) {
    super(props);
    this.state = {
      tick: 0,
    };
  }

  private onChangeListener = (taskId: string, done: boolean) => {
    action('onChange')();
    this.taskStates.set(taskId, done);
    this.setState({ tick: this.state.tick + 1 });
  };

  render() {
    return (
      <div>{this.props.render(this.taskStates, this.onChangeListener)}</div>
    );
  }
}
