import { ServiceConfig } from '@atlaskit/util-service-support';

export type DecisionState = 'DECIDED';
export type DecisionStatus = 'CREATED';
export type TaskState = 'TODO' | 'DONE';
export type Cursor = string;

export type DecisionType = 'DECISION';
export type TaskType = 'TASK';

export interface ContentRef {
  (ref: HTMLElement | null): void;
}

export interface ObjectKey {
  localId: string;
  containerAri: string;
  objectAri: string;
}

export interface BaseItem<S> extends ObjectKey {
  state: S;
  lastUpdateDate: Date;
  type: DecisionType | TaskType;
}

export interface ServiceDecision {
  containerAri: string;
  creationDate: string;
  creator?: User;
  lastUpdater?: User;
  lastUpdateDate: string;
  localId: string;
  objectAri: string;
  participants: User[];
  // Atlassian Document fragment (json string)
  rawContent: string;
  contentAsFabricDocument: string;
  state: DecisionState;
  status: DecisionStatus;
  type: DecisionType;
}

export interface Meta {
  cursor?: string;
}

export interface ServiceDecisionResponse {
  decisions: ServiceDecision[];
  meta: Meta;
}

export type ServiceItem = ServiceDecision | ServiceTask;

export interface ServiceItemResponse {
  elements: ServiceItem[];
  meta: Meta;
}

export interface ServiceTaskResponse {
  tasks: ServiceTask[];
  meta: Meta;
}

export interface ServiceTaskState {
  containerAri: string;
  lastUpdateDate: string;
  localId: string;
  objectAri: string;
  state: TaskState;
}

export interface Decision extends BaseItem<DecisionState> {
  creationDate: Date;
  creator?: User;
  lastUpdater?: User;
  lastUpdateDate: Date;
  participants: User[];
  // Atlassian Document fragment
  content: any;
  status: DecisionStatus;
  type: DecisionType;
}

export interface DecisionResponse {
  decisions: Decision[];
  nextQuery?: Query;
}

export interface TaskResponse {
  tasks: Task[];
  nextQuery?: Query;
}

export type Item = Decision | Task;

export interface ItemResponse {
  items: Item[];
  nextQuery?: Query;
}

export type SortCriteria = 'lastUpdateDate' | 'creationDate';

export interface Query {
  containerAri: string;
  limit?: number;
  cursor?: Cursor;
  sortCriteria?: SortCriteria;
}

export interface User {
  id: string;
  displayName: string;
  nickname?: string;
  avatarUrl: string;
}

// Kept for compatibility
export type Participant = User;

export interface ServiceTask {
  containerAri: string;
  creationDate: string;
  creator?: User;
  lastUpdater?: User;
  lastUpdateDate: string;
  localId: string;
  objectAri: string;
  parentLocalId: string;
  participants: User[];
  position: number;
  // Atlassian Document fragment (json string)
  rawContent: string;
  contentAsFabricDocument: string;
  state: TaskState;
  type: TaskType;
}

export interface Task extends BaseItem<TaskState> {
  creationDate: Date;
  creator?: User;
  lastUpdater?: User;
  lastUpdateDate: Date;
  parentLocalId: string;
  participants: User[];
  position: number;
  // Atlassian Document fragment
  content: any;
  type: TaskType;
}

export type Handler = (state: TaskState | DecisionState) => void;

export type RecentUpdatesId = string;

export interface RecentUpdateContext {
  containerAri: string;
  localId?: string;
}

/**
 * A subscriber interface that can be called back if there are new decisions/tasks/items
 * available as the result of an external change.
 */
export interface RecentUpdatesListener {
  /**
   * An id that can be used to unsubscribe
   */
  id(id: RecentUpdatesId): void;

  /**
   * Indicates there are recent updates, and the listener should refresh
   * the latest items from the TaskDecisionProvider.
   *
   * There will be a number of retries until expectedLocalId, if passed.
   *
   * @param updateContext Recent update context
   */
  recentUpdates(updateContext: RecentUpdateContext): void;
}

export interface TaskDecisionResourceConfig extends ServiceConfig {
  currentUser?: User;
  pubSubClient?: PubSubClient;
}

export interface TaskDecisionProvider {
  getDecisions(
    query: Query,
    recentUpdatesListener?: RecentUpdatesListener,
  ): Promise<DecisionResponse>;
  getTasks(
    query: Query,
    recentUpdatesListener?: RecentUpdatesListener,
  ): Promise<TaskResponse>;
  getItems(
    query: Query,
    recentUpdatesListener?: RecentUpdatesListener,
  ): Promise<ItemResponse>;

  unsubscribeRecentUpdates(id: RecentUpdatesId): void;
  notifyRecentUpdates(updateContext: RecentUpdateContext): void;

  // Tasks
  toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
  subscribe(objectKey: ObjectKey, handler: Handler): void;
  unsubscribe(objectKey: ObjectKey, handler: Handler): void;
  getCurrentUser?(): User | undefined;
}

/**
 * Same as RendererContext in editor-core (don't want an direct dep though)
 */
export interface RendererContext {
  objectAri: string;
  containerAri: string;
}

export interface RenderDocument {
  (document: any, rendererContext?: RendererContext): JSX.Element;
}

export interface OnUpdate<T> {
  (allDecisions: T[], newDecisions: T[]): void;
}

export type Appearance = 'inline';

/**
 * Same as PubSub client types (don't want a direct dep though)
 */

export type ARI = string;
export type AVI = string;

export interface PubSubOnEvent<T = any> {
  (event: string, data: T): void;
}

export interface PubSubClient {
  on(eventAvi: string, listener: PubSubOnEvent): PubSubClient;

  off(eventAvi: string, listener: PubSubOnEvent): PubSubClient;

  join(aris: ARI[]): Promise<PubSubClient>;

  leave(aris: ARI[]): Promise<PubSubClient>;
}

export enum PubSubSpecialEventType {
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED',
  RECONNECT = 'RECONNECT',
}
