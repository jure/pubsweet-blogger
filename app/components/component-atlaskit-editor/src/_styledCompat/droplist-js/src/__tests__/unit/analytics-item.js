//
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next'
import {
  name as packageName,
  version as packageVersion,
} from '../../version.json'
import '../../components/Item'

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}))

describe('DroplistItem', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'droplistItem',
      packageName,
      packageVersion,
    })
  })

  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit')
    expect(withAnalyticsEvents).toHaveBeenCalledWith({
      onActivate: {
        action: 'selected',
        actionSubject: 'droplistItem',
        attributes: {
          componentName: 'droplistItem',
          packageName,
          packageVersion,
        },
      },
    })
  })
})
