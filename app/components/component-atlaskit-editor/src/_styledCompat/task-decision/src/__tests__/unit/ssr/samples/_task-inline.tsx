import * as React from 'react';
import TaskItem from '../../../../components/TaskItem';
import TaskList from '../../../../components/TaskList';
import {
  dumpRef,
  action,
  TaskStateManager,
} from '../../../../../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple Completed TaskItem </h3>
    <TaskItem
      taskId="task-2"
      isDone={true}
      contentRef={dumpRef}
      onChange={action('onChange')}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </TaskItem>

    <h3>Simple TaskItem with placeholder</h3>
    <TaskItem
      taskId="task-1"
      contentRef={dumpRef}
      onChange={action('onChange')}
      showPlaceholder={true}
    />

    <h3>Simple TaskList</h3>
    <TaskStateManager
      render={(taskStates, onChangeListener) => (
        <TaskList>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-1"
            onChange={onChangeListener}
            isDone={taskStates.get('task-1')}
          >
            Hello <b>world</b>.
          </TaskItem>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-2"
            onChange={onChangeListener}
            isDone={taskStates.get('task-2')}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </TaskItem>
          <TaskItem
            contentRef={dumpRef}
            taskId="task-3"
            onChange={onChangeListener}
            isDone={taskStates.get('task-3')}
          >
            OMG
          </TaskItem>
        </TaskList>
      )}
    />
  </div>
);
