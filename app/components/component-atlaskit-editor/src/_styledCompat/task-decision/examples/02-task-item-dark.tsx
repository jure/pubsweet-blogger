import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';
// @ts-ignore
import { AtlaskitThemeProvider } from '@atlaskit/theme';

import TaskItem from '../src/components/TaskItem';
import { dumpRef, action, document } from '../example-helpers/story-utils';

export default () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <h3>Simple TaskItem</h3>
    <TaskItem
      taskId="task-1"
      contentRef={dumpRef}
      onChange={action('onChange')}
    >
      Hello <b>world</b>.
    </TaskItem>

    <h3>Long TaskItem</h3>
    <TaskItem taskId="task-1" contentRef={dumpRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </TaskItem>

    <h3>Simple Completed TaskItem </h3>
    <TaskItem
      taskId="task-2"
      isDone={true}
      contentRef={dumpRef}
      onChange={action('onChange')}
    >
      <Renderer document={document} />
    </TaskItem>

    <h3>Simple TaskItem with renderer</h3>
    <TaskItem
      taskId="task-3"
      contentRef={dumpRef}
      onChange={action('onChange')}
    >
      <Renderer document={document} />
    </TaskItem>

    <h3>Simple TaskItem with placeholder</h3>
    <TaskItem
      taskId="task-1"
      contentRef={dumpRef}
      onChange={action('onChange')}
      showPlaceholder={true}
    />
  </AtlaskitThemeProvider>
);
