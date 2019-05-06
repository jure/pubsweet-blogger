import * as React from 'react';
import { mount } from 'enzyme';
import FabricAnalyticsListener, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import TaskList from '../../../components/TaskList';
import TaskItem from '../../../components/TaskItem';

describe('<TaskList/>', () => {
  let analyticsWebClientMock: AnalyticsWebClient;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  it('should render all TaskItems', () => {
    const component = mount(
      <TaskList>
        <TaskItem taskId="task-1">1</TaskItem>
        <TaskItem taskId="task-2">2</TaskItem>
      </TaskList>,
    );
    expect(component.find('li').length).toEqual(2);
    expect(component.find(TaskItem).length).toEqual(2);
  });

  it('should render single TaskItem', () => {
    const component = mount(
      <TaskList>
        <TaskItem taskId="task-1">1</TaskItem>
      </TaskList>,
    );
    expect(component.find('li').length).toEqual(1);
    expect(component.find(TaskItem).length).toEqual(1);
  });

  it("shouldn't render list when no items", () => {
    const component = mount(<TaskList />);
    expect(component.find('ol').length).toEqual(0);
    expect(component.find('li').length).toEqual(0);
    expect(component.find(TaskItem).length).toEqual(0);
  });

  it('should include data attributes on ol/li', () => {
    const component = mount(
      <TaskList>
        <TaskItem taskId="task-1">1</TaskItem>
      </TaskList>,
    );
    const ol = component.find('ol');
    expect(ol.length).toEqual(1);
    expect(ol.prop('data-task-list-local-id')).toEqual('');
    const li = component.find('li');
    expect(li.length).toEqual(1);
    expect(li.prop('data-task-local-id')).toEqual('');
  });

  describe('analytics', () => {
    it('check action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskList listId="list-1">
            <TaskItem taskId="task-1">
              Hello <b>world</b>
            </TaskItem>
          </TaskList>
        </FabricAnalyticsListener>,
      );
      component.find('input').simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'checked',
          actionSubject: 'action',
          attributes: {
            listLocalId: 'list-1',
            position: 0,
            listSize: 1,
            localId: 'task-1',
          },
        }),
      );
    });

    it('uncheck action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <TaskList listId="list-1">
            <TaskItem taskId="task-1" isDone={false}>
              Hello <b>world</b>
            </TaskItem>
            <TaskItem taskId="task-2" isDone={true}>
              Goodbye <b>world</b>
            </TaskItem>
          </TaskList>
        </FabricAnalyticsListener>,
      );
      component
        .find('input')
        .at(1)
        .simulate('change');
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClientMock.sendUIEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'unchecked',
          actionSubject: 'action',
          attributes: {
            listLocalId: 'list-1',
            position: 1,
            listSize: 2,
            localId: 'task-2',
          },
        }),
      );
    });
  });
});
