"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var profile_data_1 = require("./profile-data");
var util_1 = require("./util");
// tslint:disable-next-line:variable-name
function getMockProfileClient(BaseProfileClient, modifyResponse) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(MockProfileClient, _super);
        function MockProfileClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // eslint-disable-next-line class-methods-use-this
        MockProfileClient.prototype.makeRequest = function (_cloudId, userId) {
            var timeout = util_1.random(1500) + 500;
            var matchError = userId.match(/^error:([0-9a-zA-Z\-]+)$/);
            var error = matchError && matchError[1];
            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    if (error) {
                        return reject({ reason: error });
                    }
                    var profile = profile_data_1.default[userId];
                    if (!profile) {
                        return reject({ reason: 'default' });
                    }
                    var weekday = util_1.getWeekday();
                    var data = tslib_1.__assign({}, profile);
                    data.remoteTimeString = util_1.getTimeString();
                    data.remoteWeekdayIndex = weekday.index;
                    data.remoteWeekdayString = weekday.string;
                    return resolve(modifyResponse(data));
                }, timeout);
            });
        };
        return MockProfileClient;
    }(BaseProfileClient));
}
exports.default = getMockProfileClient;
//# sourceMappingURL=mock-profile-client.js.map