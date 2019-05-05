"use strict";
// Duplicate or utils/logger.ts from elements packages
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var debugEnabled = false;
var stacktracesEnabled = false;
function enableLogger(enable) {
    debugEnabled = enable;
}
exports.enableLogger = enableLogger;
function enableStacktraces(enable) {
    stacktracesEnabled = enable;
}
exports.enableStacktraces = enableStacktraces;
function logStacktrace() {
    if (stacktracesEnabled) {
        // tslint:disable-next-line:no-console
        console.log(new Error().stack);
    }
}
exports.logStacktrace = logStacktrace;
function debug(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugEnabled) {
        // tslint:disable-next-line:no-console
        console.log.apply(console, tslib_1.__spread([msg], args));
    }
}
exports.default = debug;
//# sourceMappingURL=logger.js.map