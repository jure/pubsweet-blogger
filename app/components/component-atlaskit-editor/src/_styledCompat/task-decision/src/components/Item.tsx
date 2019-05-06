import * as React from 'react';
import { PureComponent } from 'react';

import { AttributionWrapper, ContentWrapper, Wrapper } from '../styled/Item';

import { Appearance, ContentRef } from '../types';
import { Placeholder } from '../styled/Placeholder';

export interface Props {
  icon: JSX.Element;
  children?: any;
  appearance?: Appearance;
  contentRef?: ContentRef;
  placeholder?: string;
  showPlaceholder?: boolean;
  attribution?: string;
}

export default class Item extends PureComponent<Props, {}> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };

  private renderPlaceholder() {
    const { children, placeholder, showPlaceholder } = this.props;
    if (!showPlaceholder || !placeholder || children) {
      return null;
    }
    return <Placeholder contentEditable={false}>{placeholder}</Placeholder>;
  }

  renderAttribution() {
    const { attribution } = this.props;

    if (!attribution) {
      return null;
    }

    return <AttributionWrapper>{attribution}</AttributionWrapper>;
  }

  renderMessageAppearance() {
    const { contentRef, children, icon } = this.props;
    return (
      <Wrapper>
        {icon}
        {this.renderPlaceholder()}
        <ContentWrapper ref={contentRef}>{children}</ContentWrapper>
      </Wrapper>
    );
  }

  render() {
    return this.renderMessageAppearance();
  }
}
