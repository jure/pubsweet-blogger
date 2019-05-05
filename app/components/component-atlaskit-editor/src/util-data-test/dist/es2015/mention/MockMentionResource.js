import * as tslib_1 from "tslib";
import { Search } from 'js-search';
import { AbstractMentionResource, } from '@atlaskit/mention';
import debug from '../logger';
import { mentionResult } from './mention-data';
import { HttpError } from './utils';
var search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');
search.addIndex('nickname');
search.addDocuments(mentionResult);
var MockMentionResource = /** @class */ (function (_super) {
    tslib_1.__extends(MockMentionResource, _super);
    function MockMentionResource(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.lastReturnedSearch = 0;
        return _this;
    }
    MockMentionResource.prototype.filter = function (query) {
        var _this = this;
        var searchTime = Date.now();
        var notify = function (mentions) {
            if (searchTime >= _this.lastReturnedSearch) {
                _this.lastReturnedSearch = searchTime;
                _this._notifyListeners(mentions, { remoteSearch: true, duration: 100 });
            }
            else {
                var date = new Date(searchTime).toISOString().substr(17, 6);
                debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
            }
            _this._notifyAllResultsListeners(mentions);
        };
        var notifyErrors = function (error) {
            _this._notifyErrorListeners(error);
        };
        var minWait = this.config.minWait || 0;
        var randomTime = (this.config.maxWait || 0) - minWait;
        var waitTime = Math.random() * randomTime + minWait;
        setTimeout(function () {
            var mentions;
            if (query === 'error') {
                notifyErrors(new Error('mock-error'));
                return;
            }
            else if (query === '401' || query === '403') {
                notifyErrors(new HttpError(parseInt(query, 10), 'get off my lawn'));
                return;
            }
            else if (query) {
                mentions = search.search(query);
            }
            else {
                mentions = mentionResult;
            }
            notify({
                mentions: mentions,
                query: query,
            });
        }, waitTime + 1);
    };
    // eslint-disable-next-line class-methods-use-this
    MockMentionResource.prototype.recordMentionSelection = function (mention) {
        debug("Record mention selection " + mention.id);
    };
    return MockMentionResource;
}(AbstractMentionResource));
export { MockMentionResource };
//# sourceMappingURL=MockMentionResource.js.map