import * as React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import TaskDecisionExample from '../examples/00-decision-item';
const TaskDecisionSource = require('!!raw-loader!../examples/00-decision-item');

const TaskDecisionProps = require('!!extract-react-types-loader!../src/components/DecisionItem');

export default md`
  This component provides components for rendering tasks and decisions.

  ## Usage

  Use the component in your React app as follows:

  ${code`
  import { DecisionList, DecisionItem } from '@atlaskit/task-decision';
  ReactDOM.render(<DecisionItem>A decision</DecisionItem>, container);
  ReactDOM.render(
    <DecisionList>
      <DecisionItem>A decision</DecisionItem>
      <DecisionItem>Another decision</DecisionItem>
    </DecisionList>,
    container,
  );
   };`}

   ${(
     <Example
       packageName="@atlaskit/status"
       Component={TaskDecisionExample}
       title="Status Picker"
       source={TaskDecisionSource}
     />
   )}

  ${<Props heading="Decision Props" props={TaskDecisionProps} />}
`;
// TODO: Add more information for task.
