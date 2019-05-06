//
import React from 'react'
import { shallow } from 'enzyme'

import Presence from '../../Presence'
import getPresenceSVG from '../../../helpers/getPresenceSVG'

const PRESENCE_TYPES = ['busy', 'focus', 'offline', 'online']

describe('Avatar', () => {
  describe('Presence', () => {
    PRESENCE_TYPES.forEach(presence =>
      describe(`when presence is ${presence}`, () =>
        it('should render content', () => {
          // eslint-disable-next-line chai-expect/missing-assertion
          expect(
            shallow(<Presence presence={presence} />).type(
              getPresenceSVG(presence),
            ),
          ).toBeTruthy()
        })),
    )

    it('should render children if provided', () => {
      const wrapper = shallow(
        <Presence presence={PRESENCE_TYPES[0]}>
          <span className="child" />
        </Presence>,
      )
      expect(wrapper.find(Presence)).toHaveLength(0)
      expect(wrapper.find('span')).toHaveLength(1)
      expect(wrapper.find('span').hasClass('child')).toBe(true)
    })
  })
})
