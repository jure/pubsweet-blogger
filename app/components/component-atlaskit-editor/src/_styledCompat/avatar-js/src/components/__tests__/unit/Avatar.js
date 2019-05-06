//
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Tooltip from '@atlaskit/tooltip'
import Avatar from '../../Avatar'
import AvatarImage from '../../AvatarImage'
import Presence from '../../Presence'
import { getSize } from '../../../styled/utils'
import { Slot } from '../../../styled/AvatarImage'
import { AVATAR_SIZES } from '../../../styled/constants'

const busy = 'busy'
const offline = 'offline'
const focus = 'focus'
const online = 'online'
const SIZES = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']

const src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

describe('Avatar', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Avatar />)
    expect(wrapper).not.toBe(undefined)
  })

  describe('size property', () => {
    SIZES.forEach(size => {
      describe(`when is set to ${size}`, () => {
        it('should have the correct dimensions', () => {
          const result = getSize({ size })
          expect(result).toBe(AVATAR_SIZES[size])
        })
      })
    })
  })

  describe('with component prop', () => {
    it('should not throw error when a custom component is used', () => {
      function CustomComponent({ children }) {
        return <span>{children}</span>
      }

      expect(() => {
        mount(<Avatar component={CustomComponent} src={src} />)
      }).not.toThrow()
    })
  })

  describe('name property', () => {
    it('should set an aria-label for the default image', () => {
      const name = 'John Smith'
      const wrapper = render(<Avatar name={name} />)
      expect(wrapper.find(`[aria-label='${name}']`)).toHaveLength(1)
    })

    it('should set an aria-label for custom images', () => {
      const name = 'John Smith'
      const wrapper = render(<Avatar name={name} src={src} />)
      expect(wrapper.find(`[aria-label='${name}']`)).toHaveLength(1)
    })

    it('should not render a native SVG title for default images', () => {
      const wrapper = render(<Avatar name="Test" />)
      expect(wrapper.find('svg > title')).toHaveLength(0)
    })

    it('should not render custom images with a title attribute', () => {
      const wrapper = render(<Avatar name="Test" src={src} />)
      expect(wrapper.find('[title]')).toHaveLength(0)
    })
  })

  describe('presence property', () => {
    it('should NOT be visible when omitted', () => {
      const wrapper = mount(<Avatar />)
      expect(wrapper.find(Presence).find('svg')).toHaveLength(0)
    })
    ;[online, busy, offline, focus].forEach(presence => {
      describe(`when presence is set to '${presence}'`, () => {
        let wrapper
        beforeEach(() => {
          wrapper = mount(<Avatar presence={presence} />)
        })

        it('should be visible', () => {
          expect(wrapper.find(Presence).find('svg').length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('borderColor property', () => {
    it('should be relfected in the Presence component', () => {
      const borderColor = '#ff0000'
      const wrapper = mount(
        <Avatar borderColor={borderColor} presence="online" />,
      )
      const presence = wrapper.find(Presence)
      expect(presence.length).toBeGreaterThan(0)
      expect(presence.prop('borderColor')).toBe(borderColor)
    })
  })

  describe('appearance property', () => {
    it('should default to circle avatar', () => {
      const wrapper = mount(<Avatar />)
      expect(wrapper.find(AvatarImage).prop('appearance')).toBe('circle')
    })

    it('should apply rounded corners for square avatar', () => {
      const wrapper = mount(<Avatar appearance="square" />)
      expect(wrapper.find(AvatarImage).prop('appearance')).toBe('square')
    })
  })

  describe('enableTooltip property', () => {
    it('should wrap with a tooltip if enableTooltip is true and name set', () => {
      const wrapper = mount(<Avatar enableTooltip name="Test" />)
      expect(wrapper.find(Tooltip).prop('content')).toBe('Test')
    })

    it('should not wrap with a tooltip if enableTooltip is false', () => {
      const wrapper = mount(<Avatar enableTooltip={false} />)
      expect(wrapper.find(Tooltip)).toHaveLength(0)
    })

    it('should not wrap with a tooltip if enableTooltip is true but no name specified', () => {
      const wrapper = mount(<Avatar enableTooltip />)
      expect(wrapper.find(Tooltip)).toHaveLength(0)
    })
  })

  describe('react element as the presence property', () => {
    it('should render the presence', () => {
      const MyIcon = <div className="my-icon" />
      const wrapper = mount(<Avatar presence={MyIcon} />)
      expect(wrapper.find('.my-icon')).toHaveLength(1)
    })

    it('should pass presence value to Presence', () => {
      const wrapper = mount(<Avatar presence={online} />)
      const presence = wrapper.find(Presence)
      expect(presence.exists()).toBe(true)
      expect(presence.prop('presence')).toBe(online)
    })

    it('should pass presence element to Presence', () => {
      const MyIcon = <div className="my-icon" />
      const wrapper = mount(<Avatar presence={MyIcon} />)
      const presence = wrapper.find(Presence)

      expect(presence.exists()).toBe(true)
      expect(presence.find('.my-icon')).toHaveLength(1)
    })
  })
})

test('theming - can change background color based on appearance prop', () => {
  const wrapper = mount(
    <Avatar
      appearance="square"
      isLoading
      src={src}
      theme={(theme, props) => ({
        ...theme(props),
        backgroundColor: props.appearance === 'square' ? 'red' : 'green',
      })}
    />,
  )
  const style = wrapper
    .find(Slot)
    .find('span')
    .prop('style')
  expect(style.backgroundColor).toBe('red')
})
