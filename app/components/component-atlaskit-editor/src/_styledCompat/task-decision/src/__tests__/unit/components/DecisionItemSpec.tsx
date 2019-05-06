import * as React from 'react';
import { mount } from 'enzyme';
import DecisionItem from '../../../components/DecisionItem';
import { AttributionWrapper, ContentWrapper } from '../../../styled/Item';
import { Placeholder } from '../../../styled/Placeholder';
import { getParticipants } from '../_test-data';

describe('<DecisionItem/>', () => {
  it('should render children', () => {
    const component = mount(
      <DecisionItem>
        Hello <b>world</b>
      </DecisionItem>,
    );
    expect(component.find('b').length).toBe(1);
    expect(component.find(ContentWrapper).text()).toBe('Hello world');
  });

  it('should render callback with ref', () => {
    let contentRef: HTMLElement | null = null;
    const handleContentRef = (ref: HTMLElement | null) => (contentRef = ref);
    const component = mount(
      <DecisionItem contentRef={handleContentRef}>
        Hello <b>world</b>
      </DecisionItem>,
    );
    expect(component.find('b').length).toBe(1);
    expect(contentRef).not.toBe(null);
    expect(contentRef!.textContent).toBe('Hello world');
  });

  describe('showPlaceholder', () => {
    it('shoud render placeholder if decision is empty', () => {
      const component = mount(
        <DecisionItem showPlaceholder={true} placeholder="cheese" />,
      );
      expect(component.find(Placeholder).length).toEqual(1);
    });

    it('should not render placeholder if decision is not empty', () => {
      const component = mount(
        <DecisionItem showPlaceholder={true} placeholder="cheese">
          Hello <b>world</b>
        </DecisionItem>,
      );
      expect(component.find(Placeholder).length).toEqual(0);
    });
  });

  describe('attribution', () => {
    const users = getParticipants(2);
    const user1 = users[0];
    const user2 = users[1];

    it('Creator and lastUpdater, done, inline - no attribution', () => {
      const component = mount(
        <DecisionItem
          appearance="inline"
          creator={user1}
          lastUpdater={user2}
        />,
      );
      const attributionWrapper = component.find(AttributionWrapper);
      expect(attributionWrapper.length).toEqual(0);
    });
  });
});
