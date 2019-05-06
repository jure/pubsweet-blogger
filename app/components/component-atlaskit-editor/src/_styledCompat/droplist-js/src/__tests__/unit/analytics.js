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
import '../../components/Droplist'

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}))

describe('Droplist', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'droplist',
      packageName,
      packageVersion,
    })
  })

  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit')
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onOpenChange: {
        action: 'toggled',
        actionSubject: 'droplist',
        attributes: {
          componentName: 'droplist',
          packageName,
          packageVersion,
        },
      },
    })
  })
})
