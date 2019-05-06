//
import React from 'react'
import { shallow } from 'enzyme'
import { Content } from '../../Droplist'

describe('Dropbox content', () => {
  it('should render correctly with default styles', () => {
    expect(shallow(<Content />)).toMatchSnapshot()
  })

  it('should render max-height "90vh" when isTall is true', () => {
    expect(shallow(<Content isTall />)).toHaveStyleRule('max-height', '90vh')
  })

  it('should render max-height "317.5px" when isTall is false', () => {
    expect(shallow(<Content isTall={false} />)).toHaveStyleRule(
      'max-height',
      '317.5px',
    )
  })

  it('should render max-height "350px" when maxHeight is 350', () => {
    expect(shallow(<Content maxHeight={350} />)).toHaveStyleRule(
      'max-height',
      '350px',
    )
  })
})
