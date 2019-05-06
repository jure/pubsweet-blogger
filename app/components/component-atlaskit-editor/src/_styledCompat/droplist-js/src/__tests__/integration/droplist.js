//

import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner'
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example'
import Page from '@atlaskit/webdriver-runner/wd-wrapper'

/* Url to test the example */
const urlDrawer = getExampleUrl('core', 'droplist', 'basic-example')

/* Css selectors used for the test */
const droplistButton = 'button[type="button"]'
const droplist = 'div[data-role="droplistContent"]'

BrowserTestCase(
  'Droplist should close when Escape key is pressed in IE and Edge',
  { skip: ['safari', 'firefox', 'chrome'] }, // the issue was only occurring in IE and Edge - AK-4523
  async client => {
    const droplistTest = new Page(client)
    await droplistTest.goto(urlDrawer)
    await droplistTest.waitFor(droplistButton, 5000)
    await droplistTest.click(droplistButton)
    await droplistTest.waitFor(droplist, 1000)

    expect(await droplistTest.isVisible(droplist)).toBe(true)
    await droplistTest.keys(['Escape'])
    expect(await droplistTest.isVisible(droplist)).toBe(false)

    await droplistTest.checkConsoleErrors()
  },
)
