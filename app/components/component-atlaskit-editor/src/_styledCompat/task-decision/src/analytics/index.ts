import { createAndFireEvent } from '@atlaskit/analytics-next';
import { CreateAndFireEventFunction } from '@atlaskit/analytics-next-types';

export const fabricElementsChannel = 'fabric-elements';

export const createAndFireEventInElementsChannel: CreateAndFireEventFunction = createAndFireEvent(
  fabricElementsChannel,
);
