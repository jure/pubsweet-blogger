import { ssr_hydrate } from '@atlaskit/elements-test-helpers';
const SamplesPath = './samples';
const ExamplesPath = '../../../../examples';

describe('server side rendering and hydration', async () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    [`${SamplesPath}/_decision-inline.tsx`],
    [`${SamplesPath}/_task-inline.tsx`],
    [`${ExamplesPath}/04-resourced-task-item`],
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, fileName);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
