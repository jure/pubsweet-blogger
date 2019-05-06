import {
  RecentUpdates,
  ACTION_DECISION_FPS_EVENTS,
} from '../../../api/TaskDecisionResource';
import {
  ObjectKey,
  ServiceTask,
  TaskState,
  PubSubClient,
} from '../../../types';

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

const objectKey = {
  localId: 'task-1',
  objectAri: 'objectAri',
  containerAri: 'containerAri',
};

describe('RecentUpdates', () => {
  let mockPubSubClient: PubSubClient;

  beforeEach(() => {
    mockPubSubClient = {
      on: jest.fn(),
      off: jest.fn(),
      join: jest.fn(),
      leave: jest.fn(),
    };
  });

  it('should not subscribe to any PubSub event if PubSubClient not provided', () => {
    // tslint:disable-next-line:no-unused-expression
    new RecentUpdates();
    expect(mockPubSubClient.on).not.toHaveBeenCalled();
  });

  it('should subscribe to all action&decision PubSub event if PubSubClient is provided', () => {
    // tslint:disable-next-line:no-unused-expression
    new RecentUpdates(mockPubSubClient);
    expect(mockPubSubClient.on).toHaveBeenCalledWith(
      ACTION_DECISION_FPS_EVENTS,
      expect.any(Function),
    );
  });

  describe('#destroy', () => {
    it('should unsubscribe to all action&decision PubSub event if PubSubClient is provided', () => {
      const recentUpdates = new RecentUpdates(mockPubSubClient);
      recentUpdates.destroy();
      expect(mockPubSubClient.off).toHaveBeenCalledWith(
        ACTION_DECISION_FPS_EVENTS,
        expect.any(Function),
      );
    });
  });

  describe('#onPubSubEvent', () => {
    it('should notify of recent updates', () => {
      const recentUpdates = new RecentUpdates(mockPubSubClient);
      const mockRecentUpdatesListener = jest.fn();
      recentUpdates.subscribe('containerAri', {
        id: jest.fn(),
        recentUpdates: mockRecentUpdatesListener,
      });

      recentUpdates.onPubSubEvent(
        ACTION_DECISION_FPS_EVENTS,
        serviceTask(objectKey),
      );

      expect(mockRecentUpdatesListener).toHaveBeenCalledWith({
        containerAri: 'containerAri',
      });
    });
  });
});
