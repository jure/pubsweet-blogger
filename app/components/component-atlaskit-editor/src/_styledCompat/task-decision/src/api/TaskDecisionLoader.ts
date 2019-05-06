import {
  Item,
  Query,
  RecentUpdateContext,
  TaskDecisionProvider,
} from '../types';

/**
 * Grabs the latest Items from the service.
 */
export const loadLatestItems = (
  query: Query,
  provider: TaskDecisionProvider,
  recentUpdateContext: RecentUpdateContext,
): Promise<Item[]> => {
  if (recentUpdateContext.localId) {
    // Retry until localId is found
    return retryIteration(
      () => provider.getItems(query).then(r => r.items),
      recentUpdateContext,
    );
  }
  // Just load
  return provider.getItems(query).then(response => response.items);
};

export interface ItemLoader<T> {
  (): Promise<T[]>;
}

const retryDelaysInMilliseconds = [
  500,
  1000,
  1500,
  2500,
  4000,
  6000,
  8000,
  10000,
];

export const retryIteration = <T extends Item>(
  loader: ItemLoader<T>,
  recentUpdateContext: RecentUpdateContext,
  retry: number = 0,
): Promise<T[]> => {
  return loadWithDelay(loader, retryDelaysInMilliseconds[retry]).then(items => {
    if (
      items.filter(item => item.localId === recentUpdateContext.localId)
        .length > 0
    ) {
      return items;
    }
    const delay = retryDelaysInMilliseconds[retry || 0];
    if (!delay) {
      // Give up - just retry what we've got.
      return items;
    }
    return retryIteration(loader, recentUpdateContext, retry + 1);
  });
};

export const loadWithDelay = <T>(
  loader: ItemLoader<T>,
  delay: number,
): Promise<T[]> => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      loader().then(items => {
        resolve(items);
      });
    }, delay);
  });
};
