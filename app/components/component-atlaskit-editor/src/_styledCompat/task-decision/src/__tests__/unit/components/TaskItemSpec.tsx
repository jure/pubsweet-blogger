import * as React from 'react';
import { mount } from 'enzyme';
import FabricAnalyticsListener, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import TaskItem from '../../../components/TaskItem';
import { AttributionWrapper, ContentWrapper } from '../../../styled/Item';
import { Placeholder } from '../../../styled/Placeholder';
import { getParticipants } from '../_test-data';

describe('<TaskItem/>', () => {
  let analyticsWebClientMock: AnalyticsWebClient;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  it('should render children', () => {
    const component = mount(
      <TaskItem taskId="task-1">
        Hello <b>world</b>
      </TaskItem>,
    );
    expect(component.find('b').length).toEqual(1);
    expect(component.find(ContentWrapper).text()).toEqual('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | null = null;
    const handleContentRef = (ref: HTMLElement | null) => (contentRef = ref);
    const component = mount(
      <TaskItem taskId="task-id" contentRef={handleContentRef}>
        Hello <b>world</b>
      </TaskItem>,
    );
    expect(component.find('b').length).toEqual(1);
    expect(contentRef).not.toEqual(null);
    expect(contentRef!.textContent).toEqual('Hello world');
  });

  it('should disable input if disabled', () => {
    const component = mount(
      <TaskItem taskId="task-1" disabled={true}>
        Hello <b>world</b>
      </TaskItem>,
    );
    expect(component.find('input').prop('disabled')).toEqual(true);
  });

  describe('clicking', () => {
    it('should call onChange when checkbox is clicked', () => {
      const spy = jest.fn();
      const component = mount(
        <TaskItem taskId="task-1" onChange={spy}>
          Hello <b>world</b>
        </TaskItem>,
      );
      component.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith('task-1', true);
    });
  });

  describe('showPlaceholder', () => {
    it('should render placeholder if task is empty', () => {
      const component = mount(
        <TaskItem
          taskId="task-1"
          showPlaceholder={true}
          placeholder="cheese"
        />,
      );
      const placeholder = component.find(Placeholder);
      expect(placeholder.text()).toEqual('cheese');
    });

    it('should not render placeholder if task is not empty', () => {
      const component = mount(
        <TaskItem taskId="task-1" showPlaceholder={true} placeholder="cheese">
          Hello <b>world</b>
        </TaskItem>,
      );
      expect(component.find(Placeholder).length).toEqual(0);
    });
  });

  describe('attribution', () => {
    const users = getParticipants(2);
    const user1 = users[0];
    const user2 = users[1];

    it('Creator and lastUpdater, done, inline - no attribution', () => {
      const component = mount(
        <TaskItem
          taskId="task-1"
          appearance="inline"
          creator={user1}
          lastUpdater={user2}
          isDone={true}
        />,
      );
      const attributionWrapper = component.find(AttributionWrapper);
      expect(attributionWrapper.length).toEqual(0);
    });
  });

  describe('analytics', () => {
    it('check action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskItem taskId="task-1" appearance="inline" isDone={false} />
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'checked',
          actionSubject: 'action',
          attributes: {
            localId: 'task-1',
          },
        }),
      );
    });

    it('uncheck action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskItem taskId="task-1" appearance="inline" isDone={true} />
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'unchecked',
          actionSubject: 'action',
          attributes: {
            localId: 'task-1',
          },
        }),
      );
    });
  });
});
