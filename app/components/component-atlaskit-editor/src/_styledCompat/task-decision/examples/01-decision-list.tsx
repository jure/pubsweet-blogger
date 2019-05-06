import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

import DecisionList from '../src/components/DecisionList';
import DecisionItem from '../src/components/DecisionItem';
import { dumpRef, document } from '../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple DecisionList</h3>
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
    </DecisionList>

    <h3>Single item DecisionList</h3>
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
    </DecisionList>

    <h3>Empty DecisionList</h3>
    <DecisionList />
  </div>
);
