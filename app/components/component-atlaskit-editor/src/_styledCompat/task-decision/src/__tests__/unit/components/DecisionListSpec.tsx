import * as React from 'react';
import { mount } from 'enzyme';
import DecisionList from '../../../components/DecisionList';
import DecisionItem from '../../../components/DecisionItem';

describe('<DecisionList/>', () => {
  it('should render all DecisionItems', () => {
    const component = mount(
      <DecisionList>
        <DecisionItem>1</DecisionItem>
        <DecisionItem>2</DecisionItem>
      </DecisionList>,
    );
    expect(component.find('li').length).toBe(2);
    expect(component.find(DecisionItem).length).toBe(2);
  });
  it('should render single DecisionItem', () => {
    const component = mount(
      <DecisionList>
        <DecisionItem>1</DecisionItem>
      </DecisionList>,
    );
    expect(component.find('li').length).toBe(1);
    expect(component.find(DecisionItem).length).toBe(1);
  });
  it("shouldn't render list when no items", () => {
    const component = mount(<DecisionList />);
    expect(component.find('ul').length).toBe(0);
    expect(component.find('li').length).toBe(0);
    expect(component.find(DecisionItem).length).toBe(0);
  });
  it('should include data attributes on ol/li', () => {
    const component = mount(
      <DecisionList>
        <DecisionItem>1</DecisionItem>
      </DecisionList>,
    );
    const ol = component.find('ol');
    expect(ol.length).toEqual(1);
    expect(ol.prop('data-decision-list-local-id')).toEqual('');
    const li = component.find('li');
    expect(li.length).toEqual(1);
    expect(li.prop('data-decision-local-id')).toEqual('');
  });
});
