import { Search } from 'js-search';

import {
  MentionDescription,
  MentionsResult,
  AbstractMentionResource,
} from '@atlaskit/mention';
import debug from '../logger';
import { mentionResult } from './mention-data';
import { MockMentionConfig } from './MockMentionResource';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');
search.addIndex('nickname');

search.addDocuments(mentionResult);

export class MockMentionResourceWithInfoHints extends AbstractMentionResource {
  private config: MockMentionConfig;
  private lastReturnedSearch: number;

  constructor(config: MockMentionConfig) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
  }

  filter(query: string): void {
    const searchTime = Date.now();
    const notify = (mentions: MentionsResult) => {
      if (searchTime >= this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
      this._notifyAllResultsListeners(mentions);
    };
    const notifyInfo = (info: string) => {
      this._notifyInfoListeners(info);
    };

    const notifyErrors = (error: Error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this.config.minWait || 0;
    const randomTime = (this.config.maxWait || 0) - minWait;
    const waitTime = Math.random() * randomTime + minWait;
    window.setTimeout(() => {
      let mentions: Array<any> = [];
      if (query === 'error') {
        notifyErrors(new Error('mock-error'));
        return;
      } else if (query && query.length >= 3) {
        mentions = search.search(query);

        if (!mentions.length) {
          notifyInfo(`Found no matches for ${query}`);
        }
      } else {
        notifyInfo('Continue typing to search for a user');
      }
      notify({
        mentions,
        query,
      });
    }, waitTime + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention: MentionDescription): void {
    debug(`Record mention selection ${mention.id}`);
  }
}
