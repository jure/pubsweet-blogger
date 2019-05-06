//
import React from 'react'
import { mount, shallow } from 'enzyme'
import AvatarImage, { DefaultImage, clearCache } from '../../AvatarImage'

const src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
const src2 =
  'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg'
const imgSpan = '[role="img"]'

describe('Avatar', () =>
  describe('Image', () => {
    it('should render an image span when the src is set"', () => {
      const wrapper = mount(
        <AvatarImage appearance="circle" size="medium" src={src} />,
      )
      expect(wrapper.find(imgSpan).exists()).toBe(true)
    })
    it('should not render an image span when the src is not set"', () =>
      expect(
        shallow(<AvatarImage appearance="circle" size="medium" />)
          .find(imgSpan)
          .exists(),
      ).toBe(false))

    describe('default avatar', () => {
      describe('should render default avatar', () => {
        it('when no properties are provided', () =>
          expect(
            shallow(<AvatarImage appearance="circle" size="medium" />)
              .find(DefaultImage)
              .exists(),
          ).toBe(true))

        it('when there is an error', () =>
          expect(
            shallow(<AvatarImage appearance="circle" size="medium" />)
              .setState({ hasError: true, isLoading: false })
              .find(DefaultImage)
              .exists(),
          ).toBe(true))

        it('when src is set and there is an error', () =>
          expect(
            shallow(<AvatarImage appearance="circle" size="medium" src={src} />)
              .setState({ hasError: true, isLoading: false })
              .find(DefaultImage)
              .exists(),
          ).toBe(true))
      })

      describe('should not render default avatar', () => {
        it('when loading=true and no src', () =>
          expect(
            shallow(<AvatarImage appearance="circle" size="medium" />)
              .setState({ isLoading: true })
              .find(DefaultImage)
              .exists(),
          ).toBe(false))

        it('when src is set', () =>
          expect(
            shallow(<AvatarImage appearance="circle" size="medium" src={src} />)
              .find(DefaultImage)
              .exists(),
          ).toBe(false))
      })
    })

    describe('src property', () => {
      describe('set at mount time', () => {
        let wrapper
        beforeEach(() => {
          wrapper = mount(
            <AvatarImage appearance="circle" size="medium" src={src} />,
          )
          // setting src to a string doesn't seem to trigger the successful loading in tests
          // so we mock that and wait for our component to respond
          wrapper.instance().handleLoadSuccess()
        })
        afterEach(() => {
          clearCache()
        })

        it('should set the background image on the internal span to src', () => {
          expect(wrapper.prop('src')).toBe(src)
          const span = wrapper
            .find(imgSpan)
            .at(0)
            .getDOMNode()
          expect(span.style.backgroundImage).toBe(`url(${src})`)
        })

        it('should render an image span when src is set', () =>
          expect(wrapper.find(imgSpan).exists()).toBe(true))

        it('should set isLoading=false when a same src is provided as the src already loaded', () => {
          // isLoading is still true here, perhaps need a waitUntil?
          expect(wrapper.state('isLoading')).toBe(false)
          wrapper.setProps({ src })
          expect(wrapper.state('isLoading')).toBe(false)
          expect(wrapper.state('hasError')).toBe(false)
        })

        it('should set isLoading=true when a new src is provided', () => {
          const stateSpy = jest.spyOn(wrapper.instance(), 'setState')
          wrapper.setProps({ src: src2 })
          expect(stateSpy.mock.calls[0][0]).toEqual({ isLoading: true })
        })

        it('should set isLoading=false & hasError=false when src is loaded without errors', () => {
          expect(wrapper.state('isLoading')).toBe(false)
          expect(wrapper.state('hasError')).toBe(false)
        })

        it('should set isLoading=false & hasError=true when a new invalid src is provided', () => {
          wrapper.instance().handleLoadError()
          expect(wrapper.state('isLoading')).toBe(false)
          expect(wrapper.state('hasError')).toBe(true)
        })
      })

      describe('set after mount time', () => {
        it('should load image successfully when src set', () => {
          const wrapper = mount(
            <AvatarImage appearance="circle" size="medium" />,
          )
          expect(wrapper.state('isLoading')).toBe(false)

          const stateSpy = jest.spyOn(wrapper.instance(), 'setState')
          wrapper.setProps({ src })
          wrapper.instance().handleLoadSuccess()

          expect(stateSpy.mock.calls[0][0]).toEqual({ isLoading: true })
          expect(stateSpy.mock.calls[1][0]).toEqual({
            hasError: false,
            isLoading: false,
          })
        })
      })
    })
  }))
