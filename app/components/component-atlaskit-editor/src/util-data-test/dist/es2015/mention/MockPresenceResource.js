import * as tslib_1 from "tslib";
import { AbstractPresenceResource } from '@atlaskit/mention';
var MockPresenceResource = /** @class */ (function (_super) {
    tslib_1.__extends(MockPresenceResource, _super);
    function MockPresenceResource(minTimeout, maxTimeout) {
        var _this = _super.call(this) || this;
        _this.minTimeout = minTimeout || 0;
        _this.maxTimeout = maxTimeout || 0;
        _this.statuses = ['online', 'offline', 'busy', 'focus', undefined];
        return _this;
    }
    MockPresenceResource.prototype.getTimeout = function () {
        return (this.minTimeout + (this.maxTimeout - this.minTimeout) * Math.random());
    };
    MockPresenceResource.prototype.getStatus = function () {
        return this.statuses[Math.floor(Math.random() * this.statuses.length)];
    };
    // eslint-disable-next-line class-methods-use-this
    MockPresenceResource.prototype.getTime = function () {
        var minFormat = new Intl.NumberFormat('us-EN', {
            minimumIntegerDigits: 2,
        });
        var time;
        if (Math.random() > 0.5) {
            var hour = Math.floor(Math.random() * 12) + 1;
            var min = minFormat.format(new Date().getMinutes());
            var ampm = ['am', 'pm'][Math.floor(Math.random() * 2)];
            time = hour + ":" + min + ampm;
        }
        return time;
    };
    MockPresenceResource.prototype.refreshPresence = function (ids) {
        var _this = this;
        var presences = {};
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var status_1 = this.getStatus();
            var time = this.getTime();
            if (status_1 || time) {
                presences[id] = {
                    status: status_1,
                    time: time,
                };
            }
        }
        window.setTimeout(function () {
            _this.notifyListeners(presences);
        }, this.getTimeout());
    };
    return MockPresenceResource;
}(AbstractPresenceResource));
export { MockPresenceResource };
//# sourceMappingURL=MockPresenceResource.js.map