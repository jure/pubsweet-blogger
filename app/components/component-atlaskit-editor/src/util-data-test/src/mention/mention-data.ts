declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const mentionData = require('../json-data/mention-data.json') as any; // MentionsResult

export const mentionResult: any[] = mentionData.mentions;

export const mentionDataSize = mentionResult.length;
