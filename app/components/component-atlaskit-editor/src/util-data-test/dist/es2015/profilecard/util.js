// String.prototype.padStart is the thing which should be used here
// unfortunately we're using too old TS compiler which doesn't have "es2017.string" lib
function padMinutes(minutes) {
    return minutes < 10 ? "0" + minutes : String(minutes);
}
export var random = function (int) { return Math.floor(Math.random() * (int + 1)); };
export var getWeekday = function () {
    var array = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var index = random(6);
    return {
        index: index,
        string: array[index],
    };
};
export var getTimeString = function () {
    var hours = random(23);
    var minutes = random(59);
    var meridiem = ['am', 'pm'][Math.floor(hours / 12)];
    return (hours === 0 ? 12 : hours % 12) + ":" + padMinutes(minutes) + meridiem;
};
//# sourceMappingURL=util.js.map