import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import FabricAnalyticsListener, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import { waitUntil } from '@atlaskit/util-common-test';
import ResourcedTaskItem from '../../../components/ResourcedTaskItem';
import TaskItem from '../../../components/TaskItem';
import { getParticipants } from '../_test-data';
import { Placeholder } from '../../../styled/Placeholder';
import Item from '../../../components/Item';
import { TaskDecisionProvider } from '../../../types';
import { asMock } from '../_mock';

describe('<ResourcedTaskItem/>', () => {
  let provider: TaskDecisionProvider;
  let component: ReactWrapper<ResourcedTaskItem>;
  let analyticsWebClientMock: AnalyticsWebClient;

  beforeEach(() => {
    provider = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      toggleTask: jest.fn(() => Promise.resolve(true)),

      getDecisions: jest.fn(),
      getTasks: jest.fn(),
      getItems: jest.fn(),

      unsubscribeRecentUpdates: jest.fn(),
      notifyRecentUpdates: jest.fn(),
    };
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  afterEach(() => {
    if (component.length > 0) {
      component.unmount();
    }
  });

  it('should wrap TaskItem', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
      >
        Hello World
      </ResourcedTaskItem>,
    );
    expect(component.find(TaskItem).length).toEqual(1);
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | null = null;
    const handleContentRef = (ref: HTMLElement | null) => (contentRef = ref);
    component = mount(
      <ResourcedTaskItem
        taskId="task-id"
        objectAri="objectAri"
        containerAri="containerAri"
        contentRef={handleContentRef}
      >
        Hello <b>world</b>
      </ResourcedTaskItem>,
    );
    expect(component.find('b').length).toEqual(1);
    expect(contentRef).not.toEqual(null);
    expect(contentRef!.textContent).toEqual('Hello world');
  });

  it('should call onChange prop in change handling if no provider', () => {
    const spy = jest.fn();
    component = mount(
      <ResourcedTaskItem
        taskId="task-id"
        objectAri="objectAri"
        containerAri="containerAri"
        onChange={spy}
      >
        Hello <b>world</b>
      </ResourcedTaskItem>,
    );
    const input = component.find('input');
    input.simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange prop in change handling if provider', () => {
    const spy = jest.fn();
    component = mount(
      <ResourcedTaskItem
        taskId="task-id"
        objectAri="objectAri"
        containerAri="containerAri"
        onChange={spy}
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello <b>world</b>
      </ResourcedTaskItem>,
    );
    const input = component.find('input');
    input.simulate('change');
    return waitUntil(() => asMock(provider.toggleTask).mock.calls.length).then(
      () => {
        expect(spy).toHaveBeenCalled();
      },
    );
  });

  it('should still toggle isDone of TaskItem onChange without objectAri or containerAri', () => {
    component = mount(
      <ResourcedTaskItem taskId="task-1" isDone={false}>
        Hello World
      </ResourcedTaskItem>,
    );
    const input = component.find('input');
    input.simulate('change');
    expect(component.find(TaskItem).prop('isDone')).toEqual(true);
  });

  it('should not disable taskItem if no provider', () => {
    component = mount(
      <ResourcedTaskItem taskId="task-1" isDone={false}>
        Hello World
      </ResourcedTaskItem>,
    );
    expect(component.find(TaskItem).prop('disabled')).toBeFalsy();
  });

  it('should subscribe to updates', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    return waitUntil(
      () => (provider.subscribe as jest.Mock).mock.calls.length,
    ).then(() => {
      expect(provider.subscribe).toBeCalled();
    });
  });

  it('should update on subscription callback to updates', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
        isDone={false}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    return waitUntil(() => asMock(provider.subscribe).mock.calls.length)
      .then(() => {
        expect(provider.subscribe).toBeCalled();
        expect(component.find(TaskItem).prop('isDone')).toBe(false);
        const subscribeCallback = asMock(provider.subscribe).mock.calls[0][1];
        subscribeCallback('DONE');
        component.update();
        return waitUntil(() => component.find(TaskItem).prop('isDone'));
      })
      .then(() => {
        expect(component.find(TaskItem).prop('isDone')).toBe(true);
      });
  });

  it('should call "toggleTask" when toggled', () => {
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    component.find('input').simulate('change');
    return waitUntil(() => asMock(provider.toggleTask).mock.calls.length).then(
      () => {
        expect(provider.toggleTask).toBeCalled();
      },
    );
  });

  it('should get lastUpdater name from provider if getCurrentUser is defined', () => {
    const user = getParticipants(1)[0];
    const provider2 = {
      ...provider,
      getCurrentUser: jest.fn(() => user),
    };
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider2)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    component.find('input').simulate('change');
    return waitUntil(
      () => component.update() && asMock(provider.toggleTask).mock.calls.length,
    ).then(() => {
      expect(component.find(TaskItem).prop('lastUpdater')).toEqual(user);
    });
  });

  it('should update attribution text if getCurrentUser returns a user', () => {
    const user = getParticipants(1)[0];
    const provider2 = {
      ...provider,
      getCurrentUser: jest.fn(() => user),
    };
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        taskDecisionProvider={Promise.resolve(provider2)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    component.find('input').simulate('change');
    return waitUntil(
      () => component.update() && asMock(provider.toggleTask).mock.calls.length,
    ).then(() => {
      expect(component.find(Item).prop('attribution')).toEqual(
        `Completed by ${user.displayName}`,
      );
    });
  });

  it('should show Added By when checked if provider.getCurrentUser returns undefined', () => {
    const participants = getParticipants(2);
    const creator = participants[1];
    const provider2 = {
      ...provider,
      getCurrentUser: jest.fn(() => undefined),
    };
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        creator={creator}
        taskDecisionProvider={Promise.resolve(provider2)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    component.find('input').simulate('change');
    return waitUntil(() => asMock(provider.toggleTask).mock.calls.length).then(
      () => {
        expect(component.find(Item).prop('attribution')).toEqual(
          `Added by ${creator.displayName}`,
        );
      },
    );
  });

  it('should show Added By when checked if provider.getCurrentUser is undefined', () => {
    const participants = getParticipants(2);
    const creator = participants[1];
    component = mount(
      <ResourcedTaskItem
        taskId="task-1"
        objectAri="objectAri"
        containerAri="containerAri"
        creator={creator}
        taskDecisionProvider={Promise.resolve(provider)}
      >
        Hello World
      </ResourcedTaskItem>,
    );
    component.find('input').simulate('change');
    return waitUntil(() => asMock(provider.toggleTask).mock.calls.length).then(
      () => {
        expect(component.find(Item).prop('attribution')).toEqual(
          `Added by ${creator.displayName}`,
        );
      },
    );
  });

  describe('showPlaceholder', () => {
    it('should render placeholder if task is empty', () => {
      const component = mount(
        <ResourcedTaskItem
          taskId="task-1"
          objectAri="objectAri"
          containerAri="containerAri"
          showPlaceholder={true}
          placeholder="cheese"
          taskDecisionProvider={Promise.resolve(provider)}
        />,
      );
      expect(component.find(Placeholder).length).toEqual(1);
    });

    it('should not render placeholder task if not empty', () => {
      const component = mount(
        <ResourcedTaskItem
          taskId="task-1"
          objectAri="objectAri"
          containerAri="containerAri"
          showPlaceholder={true}
          placeholder="cheese"
          taskDecisionProvider={Promise.resolve(provider)}
        >
          Hello <b>world</b>
        </ResourcedTaskItem>,
      );
      expect(component.find(Placeholder).length).toEqual(0);
    });
  });

  describe('analytics', () => {
    it('check action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <ResourcedTaskItem
            taskId="task-1"
            objectAri="objectAri"
            containerAri="containerAri"
          >
            Hello <b>world</b>
          </ResourcedTaskItem>
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
            objectAri: 'objectAri',
            containerAri: 'containerAri',
          },
        }),
      );
    });

    it('uncheck action fires an event', () => {
      const component = mount(
        <FabricAnalyticsListener client={analyticsWebClientMock}>
          <ResourcedTaskItem
            taskId="task-1"
            objectAri="objectAri"
            containerAri="containerAri"
            isDone={true}
          >
            Hello <b>world</b>
          </ResourcedTaskItem>
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
            objectAri: 'objectAri',
            containerAri: 'containerAri',
          },
        }),
      );
    });
  });
});
