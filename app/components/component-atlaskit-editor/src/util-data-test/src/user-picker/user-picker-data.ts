declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
const userPickerData = require('../json-data/user-picker-data.json') as any; // User from @atlaskit/user-picker

export default userPickerData;
