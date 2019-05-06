import { objectKeyToString } from '../../type-helpers';

describe('type-helpers', () => {
  it('objectKeyToString', () => {
    const objectKey = {
      localId: 'task-1',
      objectAri: 'object',
      containerAri: 'container',
    };
    const key = objectKeyToString(objectKey);
    expect(key).toEqual('container:object:task-1');
  });
});
