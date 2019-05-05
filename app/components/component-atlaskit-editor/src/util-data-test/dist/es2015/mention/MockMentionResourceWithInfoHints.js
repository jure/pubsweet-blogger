import * as tslib_1 from "tslib";
import { Search } from 'js-search';
import { AbstractMentionResource, } from '@atlaskit/mention';
import debug from '../logger';
import { mentionResult } from './mention-data';
var search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');
search.addIndex('nickname');
search.addDocuments(mentionResult);
var MockMentionResourceWithInfoHints = /** @class */ (function (_super) {
    tslib_1.__extends(MockMentionResourceWithInfoHints, _super);
    function MockMentionResourceWithInfoHints(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.lastReturnedSearch = 0;
        return _this;
    }
    MockMentionResourceWithInfoHints.prototype.filter = function (query) {
        var _this = this;
        var searchTime = Date.now();
        var notify = function (mentions) {
            if (searchTime >= _this.lastReturnedSearch) {
                _this.lastReturnedSearch = searchTime;
                _this._notifyListeners(mentions);
            }
            else {
                var date = new Date(searchTime).toISOString().substr(17, 6);
                debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
            }
            _this._notifyAllResultsListeners(mentions);
        };
        var notifyInfo = function (info) {
            _this._notifyInfoListeners(info);
        };
        var notifyErrors = function (error) {
            _this._notifyErrorListeners(error);
        };
        var minWait = this.config.minWait || 0;
        var randomTime = (this.config.maxWait || 0) - minWait;
        var waitTime = Math.random() * randomTime + minWait;
        window.setTimeout(function () {
            var mentions = [];
            if (query === 'error') {
                notifyErrors(new Error('mock-error'));
                return;
            }
            else if (query && query.length >= 3) {
                mentions = search.search(query);
                if (!mentions.length) {
                    notifyInfo("Found no matches for " + query);
                }
            }
            else {
                notifyInfo('Continue typing to search for a user');
            }
            notify({
                mentions: mentions,
                query: query,
            });
        }, waitTime + 1);
    };
    // eslint-disable-next-line class-methods-use-this
    MockMentionResourceWithInfoHints.prototype.recordMentionSelection = function (mention) {
        debug("Record mention selection " + mention.id);
    };
    return MockMentionResourceWithInfoHints;
}(AbstractMentionResource));
export { MockMentionResourceWithInfoHints };
//# sourceMappingURL=MockMentionResourceWithInfoHints.js.map