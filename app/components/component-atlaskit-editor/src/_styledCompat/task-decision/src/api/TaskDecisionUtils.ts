import {
  Decision,
  DecisionResponse,
  Item,
  ItemResponse,
  Query,
  ServiceDecision,
  ServiceDecisionResponse,
  ServiceItem,
  ServiceItemResponse,
  ServiceTask,
  ServiceTaskResponse,
  Task,
  TaskResponse,
  ServiceTaskState,
  BaseItem,
  TaskState,
} from '../types';
import { isServiceDecision, isServiceTask } from '../type-helpers';

export interface ResponseConverter<S, C> {
  (serviceDecisionResponse: S, query?: Query): C;
}

export const convertServiceDecisionToDecision = (
  serviceDecision: ServiceDecision,
): Decision => {
  const {
    creationDate,
    lastUpdateDate,
    rawContent,
    contentAsFabricDocument,
    ...other
  } = serviceDecision;

  return {
    creationDate: new Date(creationDate),
    lastUpdateDate: new Date(lastUpdateDate),
    content: JSON.parse(contentAsFabricDocument),
    ...other,
  };
};

export const convertServiceDecisionResponseToDecisionResponse = (
  serviceDecisionResponse: ServiceDecisionResponse,
  query?: Query,
): DecisionResponse => {
  const decisions = serviceDecisionResponse.decisions.map(
    convertServiceDecisionToDecision,
  );
  let nextQuery: Query | undefined;
  if (
    query &&
    serviceDecisionResponse.meta &&
    serviceDecisionResponse.meta.cursor
  ) {
    nextQuery = {
      ...query,
      cursor: serviceDecisionResponse.meta.cursor,
    };
  }

  return {
    decisions,
    nextQuery,
  };
};

export const convertServiceTaskToTask = (serviceTask: ServiceTask): Task => {
  const {
    creationDate,
    lastUpdateDate,
    rawContent,
    contentAsFabricDocument,
    ...other
  } = serviceTask;

  return {
    creationDate: new Date(creationDate),
    lastUpdateDate: new Date(lastUpdateDate),
    content: JSON.parse(contentAsFabricDocument),
    ...other,
  };
};

export const convertServiceTaskStateToBaseItem = (
  serviceTaskInfo: ServiceTaskState,
): BaseItem<TaskState> => {
  const { lastUpdateDate, ...other } = serviceTaskInfo;

  return {
    type: 'TASK',
    lastUpdateDate: new Date(lastUpdateDate),
    ...other,
  };
};

export const convertServiceTaskResponseToTaskResponse = (
  serviceResponse: ServiceTaskResponse,
  query?: Query,
): TaskResponse => {
  const tasks = serviceResponse.tasks.map(convertServiceTaskToTask);
  let nextQuery: Query | undefined;
  if (query && serviceResponse.meta && serviceResponse.meta.cursor) {
    nextQuery = {
      ...query,
      cursor: serviceResponse.meta.cursor,
    };
  }

  return {
    tasks,
    nextQuery,
  };
};

export const convertServiceItemToItem = (
  items: Item[],
  serviceItem: ServiceItem,
): Item[] => {
  if (isServiceDecision(serviceItem)) {
    items.push(convertServiceDecisionToDecision(serviceItem));
  } else if (isServiceTask(serviceItem)) {
    items.push(convertServiceTaskToTask(serviceItem));
  }

  return items;
};

export const convertServiceItemResponseToItemResponse = (
  serviceResponse: ServiceItemResponse,
  query?: Query,
): ItemResponse => {
  const items = serviceResponse.elements.reduce<Item[]>(
    convertServiceItemToItem,
    [],
  );
  let nextQuery: Query | undefined;
  if (query && serviceResponse.meta && serviceResponse.meta.cursor) {
    nextQuery = {
      ...query,
      cursor: serviceResponse.meta.cursor,
    };
  }

  return {
    items,
    nextQuery,
  };
};

export const decisionsToDocument = (decisions: Decision[]): any => ({
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'decisionList',
      content: decisions.map(decision => {
        const { content, localId, state } = decision;
        return {
          type: 'decisionItem',
          attrs: {
            localId,
            state,
          },
          content,
        };
      }),
    },
  ],
});

export const tasksToDocument = (tasks: Task[]): any => ({
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'taskList',
      content: tasks.map(task => {
        const { content, localId, state } = task;
        return {
          type: 'taskItem',
          attrs: {
            localId,
            state,
          },
          content,
        };
      }),
    },
  ],
});

export const findIndex = (
  array: any[],
  predicate: (item: any) => boolean,
): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};
