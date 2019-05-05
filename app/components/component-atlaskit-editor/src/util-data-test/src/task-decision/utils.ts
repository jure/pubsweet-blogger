import { ObjectKey } from '@atlaskit/task-decision';

// Copy of helper functions from @atlaskit/task-decision
// NOTE: if this is changed in the original package, this must also be modified
export const objectKeyToString = (objectKey: ObjectKey) => {
  const { containerAri, objectAri, localId } = objectKey;
  return `${containerAri}:${objectAri}:${localId}`;
};

export const toggleTaskState = (state: string) =>
  state === 'DONE' ? 'TODO' : 'DONE';

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
