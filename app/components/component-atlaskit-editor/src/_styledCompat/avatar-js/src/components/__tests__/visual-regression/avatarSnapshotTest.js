//
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper'

describe('Snapshot Test', () => {
  it('basic avatar example should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'avatar',
      'basicAvatar',
      global.__BASEURL__,
    )
    const image = await takeScreenShot(global.page, url)
    // $FlowFixMe
    expect(image).toMatchProdImageSnapshot()
  })
})
