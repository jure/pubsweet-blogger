import { BaseItem, DecisionResponse, DecisionState, Handler, ItemResponse, ObjectKey, Query, RecentUpdateContext, RecentUpdatesId, TaskDecisionProvider, TaskResponse, TaskState, User } from '@atlaskit/task-decision';
export interface MockTaskDecisionResourceConfig {
    hasMore?: boolean;
    lag?: number;
    error?: boolean;
    empty?: boolean;
}
export declare class MockTaskDecisionResource implements TaskDecisionProvider {
    private config?;
    private fakeCursor;
    private lastNewItemTime;
    private subscribers;
    private cachedItems;
    private batchedKeys;
    constructor(config?: MockTaskDecisionResourceConfig);
    getDecisions(query: Query): Promise<DecisionResponse>;
    getTasks(query: Query): Promise<TaskResponse>;
    getItems(query: Query): Promise<ItemResponse>;
    unsubscribeRecentUpdates(_id: RecentUpdatesId): void;
    notifyRecentUpdates(_updateContext?: RecentUpdateContext): void;
    private getNextDate;
    private applyConfig;
    getTaskState(_keys: ObjectKey[]): Promise<BaseItem<TaskState>[]>;
    toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
    subscribe(objectKey: ObjectKey, handler: Handler): void;
    unsubscribe(objectKey: ObjectKey, handler: Handler): void;
    notifyUpdated(objectKey: ObjectKey, state: TaskState | DecisionState): void;
    getCurrentUser(): User | undefined;
    private queueItem;
    private dequeueItem;
}
