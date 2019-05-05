// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Tooltip should match production example', async () => {
    const url = getExampleUrl('core', 'tooltip', 'basic', global.__BASEURL__);
    // TODO: Add a hover to trigger tooltip
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
