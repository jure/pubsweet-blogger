var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Participants = /** @class */ (function () {
    function Participants(participants) {
        if (participants === void 0) { participants = new Map(); }
        this.participants = participants;
    }
    Participants.prototype.add = function (data) {
        var newSet = new Map(this.participants);
        data.forEach(function (participant) {
            newSet.set(participant.sessionId, participant);
        });
        return new Participants(newSet);
    };
    Participants.prototype.remove = function (sessionIds) {
        var newSet = new Map(this.participants);
        sessionIds.forEach(function (sessionId) {
            newSet.delete(sessionId);
        });
        return new Participants(newSet);
    };
    Participants.prototype.update = function (sessionId, lastActive) {
        var newSet = new Map(this.participants);
        var data = newSet.get(sessionId);
        if (!data) {
            return this;
        }
        newSet.set(sessionId, __assign({}, data, { lastActive: lastActive }));
        return new Participants(newSet);
    };
    Participants.prototype.toArray = function () {
        return Array.from(this.participants.values());
    };
    Participants.prototype.get = function (sessionId) {
        return this.participants.get(sessionId);
    };
    Participants.prototype.eq = function (other) {
        var left = this.toArray()
            .map(function (p) { return p.sessionId; })
            .sort(function (a, b) { return (a > b ? -1 : 1); })
            .join('');
        var right = other
            .toArray()
            .map(function (p) { return p.sessionId; })
            .sort(function (a, b) { return (a > b ? -1 : 1); })
            .join('');
        return left === right;
    };
    return Participants;
}());
export { Participants };
