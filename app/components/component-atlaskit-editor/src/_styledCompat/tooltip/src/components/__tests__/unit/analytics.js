// @flow
import {
  withAnalyticsEvents,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../../version.json';
import '../../Tooltip';

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

describe('Tooltip', () => {
  it('should be wrapped with analytics context', () => {
    expect(withAnalyticsContext).toHaveBeenCalledWith({
      componentName: 'tooltip',
      packageName,
      packageVersion,
    });
  });

  it('should be wrapped with analytics events', () => {
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onShow: {
        action: 'displayed',
        actionSubject: 'tooltip',
        attributes: {
          componentName: 'tooltip',
          packageName,
          packageVersion,
        },
      },
      onHide: {
        action: 'hidden',
        actionSubject: 'tooltip',
        attributes: {
          componentName: 'tooltip',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
