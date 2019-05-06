//
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { mount } from 'enzyme'
import Avatar from '../../Avatar'
import AvatarImage, { DefaultImage } from '../../AvatarImage'

// Since the purpose of this test module is to test SSR behaviour
// simulate a non-DOM environment.
jest.mock('exenv', () => ({
  canUseDOM: false,
}))

describe('Avatar SSR', () => {
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // callbacks depending on the src passed to it
    // N.B. the mockImplementation callbacks are regular functions to ensure they get the
    // correct context (i.e. this: HTMLImageElement)
    jest
      .spyOn(global.Image.prototype, 'src', 'get')
      .mockImplementation(function srcGetter() {
        return this._src
      })
    jest
      .spyOn(global.Image.prototype, 'src', 'set')
      .mockImplementation(function srcSetter(src) {
        if (src === LOAD_FAILURE_SRC) {
          this.onerror(new Error('mocked error'))
        } else if (src === LOAD_SUCCESS_SRC) {
          this.onload()
        }
        this._src = src
      })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const avatar = {
    src: LOAD_SUCCESS_SRC,
  }

  // Test the SSR render inserts the actual image src in to the generated markup
  // to allow the images to load immediately when the DOM is parsed, before hydration occurs.
  it('should directly render the image src for SSR', () => {
    const actualMarkup = ReactDOMServer.renderToString(<Avatar {...avatar} />)

    expect(actualMarkup).toContain(avatar.src)
  })

  // verify that hydration with a failed image shows the default image again
  it('should hydrate from SSR', done => {
    avatar.src = LOAD_FAILURE_SRC

    const container = document.createElement('div')
    if (document.body) document.body.appendChild(container)

    const avatarMarkup = ReactDOMServer.renderToString(<Avatar {...avatar} />)
    container.innerHTML = avatarMarkup

    const hydratedWrapper = mount(<Avatar {...avatar} />, {
      hydrateIn: container,
    })
    const hydratedAvatar = hydratedWrapper.find(Avatar)
    const avatarImageInstance = hydratedAvatar.find(AvatarImage).instance()
    expect(hydratedAvatar.props().src).toBe(avatar.src)

    // when the load fails, expect that the error state is set
    expect(avatarImageInstance.state.hasError).toBe(true)
    // and the default image is what's rendered
    expect(hydratedAvatar.find(DefaultImage)).toHaveLength(1)

    hydratedWrapper.detach()
    done()
  })
})
