declare var require: {
  <T>(path: string): T;
};

export interface PresenceValidInfo {
  data: Data;
}

export interface Data {
  PresenceBulk: PresenceBulk[];
}

export interface PresenceBulk {
  userId: string;
  state: null | string;
  type: null | string;
  date: null | string;
  message: null | string;
  stateMetadata?: string;
}

// tslint:disable-next-line:no-var-requires
export const validPresenceData: PresenceValidInfo = require('../json-data/presence-valid-info.json') as PresenceValidInfo;

// tslint:disable-next-line:no-var-requires
export const invalidPresenceData: PresenceValidInfo = require('../json-data/presence-invalid-info.json') as PresenceValidInfo;
