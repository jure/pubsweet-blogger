import * as React from 'react';
import { PureComponent } from 'react';
import { CheckBoxWrapper } from '../styled/TaskItem';

import Item from './Item';
import { Appearance, ContentRef, User } from '../types';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { createAndFireEventInElementsChannel } from '../analytics';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: any;
  placeholder?: string;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  creator?: User;
  lastUpdater?: User;
  disabled?: boolean;
}

let taskCount = 0;
const getCheckBoxId = (localId: string) => `${localId}-${taskCount++}`;

export class TaskItem extends PureComponent<
  Props & WithAnalyticsEventProps,
  {}
> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };

  private checkBoxId: string;

  constructor(props: Props & WithAnalyticsEventProps) {
    super(props);
    this.checkBoxId = getCheckBoxId(props.taskId);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.taskId !== this.props.taskId) {
      this.checkBoxId = getCheckBoxId(nextProps.taskId);
    }
  }

  handleOnChange = (_evt: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange, taskId, isDone, createAnalyticsEvent } = this.props;
    const newIsDone = !isDone;
    if (onChange) {
      onChange(taskId, newIsDone);
    }
    const action = newIsDone ? 'checked' : 'unchecked';
    if (createAnalyticsEvent) {
      createAndFireEventInElementsChannel({
        action,
        actionSubject: 'action',
        eventType: 'ui',
        attributes: {
          localId: taskId,
        },
      })(createAnalyticsEvent);
    }
  };

  getAttributionText() {
    const { creator, lastUpdater, isDone } = this.props;

    if (isDone && lastUpdater) {
      return `Completed by ${lastUpdater.displayName}`;
    }

    if (!creator || !creator.displayName) {
      return undefined;
    }

    return `Added by ${creator.displayName}`;
  }

  render() {
    const {
      appearance,
      isDone,
      contentRef,
      children,
      placeholder,
      showPlaceholder,
      disabled,
    } = this.props;

    const icon = (
      <CheckBoxWrapper contentEditable={false}>
        <input
          id={this.checkBoxId}
          name={this.checkBoxId}
          type="checkbox"
          onChange={this.handleOnChange}
          checked={!!isDone}
          disabled={!!disabled}
          suppressHydrationWarning={true}
        />
        <label htmlFor={this.checkBoxId} suppressHydrationWarning={true} />
      </CheckBoxWrapper>
    );

    return (
      <Item
        appearance={appearance}
        contentRef={contentRef}
        icon={icon}
        placeholder={placeholder}
        showPlaceholder={showPlaceholder}
        attribution={this.getAttributionText()}
      >
        {children}
      </Item>
    );
  }
}

// This is to ensure that the "type" is exported, as it gets lost and not exported along with TaskItem after
// going through the high order component.
// tslint:disable-next-line:variable-name
export default withAnalyticsEvents()(TaskItem);
