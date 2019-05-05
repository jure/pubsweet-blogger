"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// String.prototype.padStart is the thing which should be used here
// unfortunately we're using too old TS compiler which doesn't have "es2017.string" lib
function padMinutes(minutes) {
    return minutes < 10 ? "0" + minutes : String(minutes);
}
exports.random = function (int) { return Math.floor(Math.random() * (int + 1)); };
exports.getWeekday = function () {
    var array = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var index = exports.random(6);
    return {
        index: index,
        string: array[index],
    };
};
exports.getTimeString = function () {
    var hours = exports.random(23);
    var minutes = exports.random(59);
    var meridiem = ['am', 'pm'][Math.floor(hours / 12)];
    return (hours === 0 ? 12 : hours % 12) + ":" + padMinutes(minutes) + meridiem;
};
//# sourceMappingURL=util.js.map