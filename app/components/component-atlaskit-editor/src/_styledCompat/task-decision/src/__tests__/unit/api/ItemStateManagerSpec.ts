import * as fetchMock from 'fetch-mock/src/client';
import {
  ItemStateManager,
  ACTION_STATE_CHANGED_FPS_EVENT,
} from '../../../api/TaskDecisionResource';
import {
  ObjectKey,
  ServiceTask,
  TaskState,
  PubSubSpecialEventType,
  PubSubClient,
} from '../../../types';

jest.useFakeTimers();

const serviceTask = (
  key: ObjectKey,
  state?: TaskState,
  creationDate?: Date,
): ServiceTask => ({
  ...key,
  creationDate: creationDate
    ? creationDate.toISOString()
    : new Date().toISOString(),
  lastUpdateDate: creationDate
    ? creationDate.toISOString()
    : new Date().toISOString(),
  parentLocalId: '123',
  participants: [],
  position: 1,
  rawContent: '[]',
  contentAsFabricDocument: '[]',
  state: state || 'TODO',
  type: 'TASK',
});

describe('ItemStateManager', () => {
  let mockPubSubClient: PubSubClient;

  const objectKey = {
    localId: 'task-1',
    objectAri: 'objectAri',
    containerAri: 'containerAri',
  };

  beforeEach(() => {
    mockPubSubClient = {
      on: jest.fn(),
      off: jest.fn(),
      join: jest.fn(),
      leave: jest.fn(),
    };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should subscribe to PubSub event if PubSubClient provided', () => {
    // tslint:disable-next-line:no-unused-expression
    new ItemStateManager({ url: '', pubSubClient: mockPubSubClient });
    expect(mockPubSubClient.on).toHaveBeenCalledWith(
      ACTION_STATE_CHANGED_FPS_EVENT,
      expect.any(Function),
    );
  });

  it('should not subscribe to any PubSub event if PubSubClient not provided', () => {
    // tslint:disable-next-line:no-unused-expression
    new ItemStateManager({ url: '' });
    expect(mockPubSubClient.on).not.toHaveBeenCalled();
  });

  it('should subscribe to PubSub Reconnect event if PubSubClient provided', () => {
    // tslint:disable-next-line:no-unused-expression
    new ItemStateManager({ url: '', pubSubClient: mockPubSubClient });
    expect(mockPubSubClient.on).toHaveBeenCalledWith(
      PubSubSpecialEventType.RECONNECT,
      expect.any(Function),
    );
  });

  describe('#destroy', () => {
    it('should unsubscribe to PubSub event if PubSubClient provided', () => {
      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });
      itemStateManager.destroy();
      expect(mockPubSubClient.off).toHaveBeenCalledWith(
        ACTION_STATE_CHANGED_FPS_EVENT,
        expect.any(Function),
      );
    });

    it('should unsubscribe to PubSub Reconnect event if PubSubClient provided', () => {
      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });
      itemStateManager.destroy();
      expect(mockPubSubClient.off).toHaveBeenCalledWith(
        PubSubSpecialEventType.RECONNECT,
        expect.any(Function),
      );
    });
  });

  describe('#onTaskUpdatedEvent', () => {
    it('should notify handlers of update if cached and event is more recent than cached version', done => {
      const mockHandler = jest.fn();

      const creationDate = new Date();
      fetchMock
        .mock({
          matcher: 'end:tasks',
          method: 'PUT',
          name: 'set-task',
          response: serviceTask(objectKey, 'DONE'),
        })
        .mock({
          matcher: 'end:tasks/state',
          name: 'get-state',
          response: [serviceTask(objectKey)],
        });

      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });

      const updateDate = new Date();
      updateDate.setFullYear(creationDate.getFullYear() + 1);
      itemStateManager.toggleTask(objectKey, 'TODO').then(() => {
        itemStateManager.subscribe(objectKey, mockHandler);
        mockHandler.mockClear();

        itemStateManager.onTaskUpdatedEvent(
          'event',
          serviceTask(objectKey, 'DONE', updateDate),
        );

        expect(mockHandler).toHaveBeenCalled();
        done();
      });

      jest.runAllTimers();
    });

    it('should update cached value if cached and event is more recent than cached version', done => {
      const mockHandler = jest.fn();

      const creationDate = new Date();
      fetchMock
        .mock({
          matcher: 'end:tasks',
          method: 'PUT',
          name: 'set-task',
          response: serviceTask(objectKey, 'TODO'),
        })
        .mock({
          matcher: 'end:tasks/state',
          name: 'get-state',
          response: [serviceTask(objectKey)],
        });

      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });

      const updateDate = new Date();
      updateDate.setFullYear(creationDate.getFullYear() + 1);
      itemStateManager.toggleTask(objectKey, 'TODO').then(() => {
        itemStateManager.onTaskUpdatedEvent(
          'event',
          serviceTask(objectKey, 'DONE', updateDate),
        );

        mockHandler.mockClear();
        itemStateManager.subscribe(objectKey, mockHandler);

        expect(mockHandler).toHaveBeenCalledWith('DONE');
        done();
      });

      jest.runAllTimers();
    });

    it('should not notify handlers of update if cached but event is older than cached version', done => {
      const mockHandler = jest.fn();

      const creationDate = new Date();
      fetchMock
        .mock({
          matcher: 'end:tasks',
          method: 'PUT',
          name: 'set-task',
          response: serviceTask(objectKey, 'DONE'),
        })
        .mock({
          matcher: 'end:tasks/state',
          name: 'get-state',
          response: [serviceTask(objectKey)],
        });

      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });

      const updateDate = new Date();
      updateDate.setFullYear(creationDate.getFullYear() - 1);
      itemStateManager.toggleTask(objectKey, 'TODO').then(() => {
        itemStateManager.subscribe(objectKey, mockHandler);
        mockHandler.mockClear();
        itemStateManager.onTaskUpdatedEvent(
          'event',
          serviceTask(objectKey, 'DONE', updateDate),
        );

        expect(mockHandler).not.toHaveBeenCalled();
        done();
      });

      jest.runAllTimers();
    });

    it('should not notify handlers of update if not cached', () => {
      const mockHandler = jest.fn();

      const creationDate = new Date();
      fetchMock
        .mock({
          matcher: 'end:tasks',
          method: 'PUT',
          name: 'set-task',
          response: serviceTask(objectKey, 'DONE'),
        })
        .mock({
          matcher: 'end:tasks/state',
          name: 'get-state',
          response: [serviceTask(objectKey)],
        });

      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });

      const updateDate = new Date();
      updateDate.setFullYear(creationDate.getFullYear() - 1);
      itemStateManager.subscribe(objectKey, mockHandler);
      mockHandler.mockClear();
      itemStateManager.onTaskUpdatedEvent(
        'event',
        serviceTask(objectKey, 'DONE', updateDate),
      );

      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('#onReconnect', () => {
    it('should refresh all cached tasks state', () => {
      fetchMock
        .mock({
          matcher: 'end:tasks',
          method: 'PUT',
          name: 'set-task',
          response: serviceTask(objectKey, 'TODO'),
        })
        .mock({
          matcher: 'end:tasks/state',
          name: 'get-state',
          response: [serviceTask(objectKey, 'DONE')],
        });

      const itemStateManager = new ItemStateManager({
        url: '',
        pubSubClient: mockPubSubClient,
      });

      itemStateManager.toggleTask(objectKey, 'TODO');

      jest.runAllTimers();

      return Promise.resolve(() => {
        expect(fetchMock.calls('get-state').length).toBe(1);

        itemStateManager.onReconnect();
        jest.runAllTimers();

        expect(fetchMock.calls('get-state').length).toBe(2);
      });
    });
  });
});
