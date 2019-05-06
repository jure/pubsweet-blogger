import {
  getDecisionsResponse,
  getItemsResponse,
  getTasksResponse,
} from './_test-data';

describe('test-data', () => {
  it('getDecisionsResponse', () => {
    const decisions = getDecisionsResponse().decisions;
    expect(decisions.length).toBe(5);
  });

  it('getItemsResponse', () => {
    const items = getItemsResponse().items;
    expect(items.length).toBe(10);
    expect(items.filter(item => item.type === 'TASK').length).toBe(5);
    expect(items.filter(item => item.type === 'DECISION').length).toBe(5);
  });

  it('getDecisionsResponse', () => {
    const tasks = getTasksResponse().tasks;
    expect(tasks.length).toBe(5);
  });
});
