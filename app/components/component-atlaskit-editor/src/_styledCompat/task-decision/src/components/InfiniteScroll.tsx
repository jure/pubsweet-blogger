import * as React from 'react';
import { Component, UIEvent } from 'react';
import * as debounce from 'lodash.debounce';

export type ThresholdReachedEventHandler = () => void;

// FIXME make common atlaskit component. This is (mostly) duplicated from @atlaskit/media-card/list/InfiniteScroll.tsx

export interface InfiniteScrollProps {
  readonly height?: number | string;

  readonly width?: number | string;
  readonly delay?: number;
  readonly threshold?: number;

  readonly onThresholdReached?: ThresholdReachedEventHandler;
}

export interface InfiniteScrollState {}

export default class InfiniteScroll extends Component<
  InfiniteScrollProps,
  InfiniteScrollState
> {
  static defaultProps = {
    width: '100%',
    delay: 1000,
    threshold: 100,
  };

  private readonly emitOnThresholdReachedWithDebounce = debounce(
    this.emitOnThresholdReached,
    this.props.delay,
    {
      leading: true,
      trailing: true,
    },
  );

  private scrollHeight: number = 0;

  render(): JSX.Element {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          overflowX: 'hidden',
          overflowY: 'auto',
          msOverflowStyle: 'scrollbar',
          display: 'inline-block',
        }}
        onScroll={this.checkThreshold}
      >
        {this.props.children}
      </div>
    );
  }

  private checkThreshold = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const threshold = this.props.threshold || 0;
    const position = target.scrollTop + target.offsetHeight;
    const thresholdModifier = 0.1;
    const adjustedThreshold = Math.min(
      threshold,
      target.scrollHeight * thresholdModifier,
    );

    const thresholdReached =
      position > this.scrollHeight &&
      position > target.scrollHeight - adjustedThreshold;
    if (thresholdReached) {
      this.scrollHeight = target.scrollHeight;

      this.emitOnThresholdReachedWithDebounce();
    }
  };

  private emitOnThresholdReached(): void {
    if (this.props.onThresholdReached) {
      this.props.onThresholdReached();
    }
  }
}
