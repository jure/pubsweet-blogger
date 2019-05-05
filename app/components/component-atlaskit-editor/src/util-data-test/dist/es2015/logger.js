// Duplicate or utils/logger.ts from elements packages
import * as tslib_1 from "tslib";
var debugEnabled = false;
var stacktracesEnabled = false;
export function enableLogger(enable) {
    debugEnabled = enable;
}
export function enableStacktraces(enable) {
    stacktracesEnabled = enable;
}
export function logStacktrace() {
    if (stacktracesEnabled) {
        // tslint:disable-next-line:no-console
        console.log(new Error().stack);
    }
}
export default function debug(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugEnabled) {
        // tslint:disable-next-line:no-console
        console.log.apply(console, tslib_1.__spread([msg], args));
    }
}
//# sourceMappingURL=logger.js.map