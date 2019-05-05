import * as tslib_1 from "tslib";
import profiles from './profile-data';
import { random, getWeekday, getTimeString } from './util';
// tslint:disable-next-line:variable-name
export default function getMockProfileClient(BaseProfileClient, modifyResponse) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(MockProfileClient, _super);
        function MockProfileClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // eslint-disable-next-line class-methods-use-this
        MockProfileClient.prototype.makeRequest = function (_cloudId, userId) {
            var timeout = random(1500) + 500;
            var matchError = userId.match(/^error:([0-9a-zA-Z\-]+)$/);
            var error = matchError && matchError[1];
            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    if (error) {
                        return reject({ reason: error });
                    }
                    var profile = profiles[userId];
                    if (!profile) {
                        return reject({ reason: 'default' });
                    }
                    var weekday = getWeekday();
                    var data = tslib_1.__assign({}, profile);
                    data.remoteTimeString = getTimeString();
                    data.remoteWeekdayIndex = weekday.index;
                    data.remoteWeekdayString = weekday.string;
                    return resolve(modifyResponse(data));
                }, timeout);
            });
        };
        return MockProfileClient;
    }(BaseProfileClient));
}
//# sourceMappingURL=mock-profile-client.js.map