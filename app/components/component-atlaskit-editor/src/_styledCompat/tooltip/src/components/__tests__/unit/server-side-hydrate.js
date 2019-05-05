// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate tooltip correctly', async () => {
  const [example] = await getExamplesFor('tooltip');
  // $StringLitteral
  const Example = require(example.filePath).default; // eslint-disable-line import/no-dynamic-require

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  ReactDOM.hydrate(<Example />, elem);
  expect(console.error).not.toBeCalled(); // eslint-disable-line no-console
});
