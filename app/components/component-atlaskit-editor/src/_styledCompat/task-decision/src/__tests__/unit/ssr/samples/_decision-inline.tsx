import * as React from 'react';
import DecisionItem from '../../../../components/DecisionItem';
import DecisionList from '../../../../components/DecisionList';
import { dumpRef } from '../../../../../example-helpers/story-utils';

export default () => (
  <div>
    <h3>Simple DecisionItem</h3>
    <DecisionItem contentRef={dumpRef}>
      Hello <b>world</b>.
    </DecisionItem>

    <h3>Long DecisionItem</h3>
    <DecisionItem contentRef={dumpRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </DecisionItem>

    <h3>Simple DecisionItem with placeholder</h3>
    <DecisionItem contentRef={dumpRef} showPlaceholder={true} />

    <h3>
      Simple DecisionItem with 1 participant, inline (shouldn't render
      participants)
    </h3>
    <DecisionItem contentRef={dumpRef} appearance="inline">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </DecisionItem>

    <h3>Simple DecisionList</h3>
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        OMG <b>YAY</b>.
      </DecisionItem>
    </DecisionList>
  </div>
);
