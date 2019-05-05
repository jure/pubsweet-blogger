"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copy of helper functions from @atlaskit/task-decision
// NOTE: if this is changed in the original package, this must also be modified
exports.objectKeyToString = function (objectKey) {
    var containerAri = objectKey.containerAri, objectAri = objectKey.objectAri, localId = objectKey.localId;
    return containerAri + ":" + objectAri + ":" + localId;
};
exports.toggleTaskState = function (state) {
    return state === 'DONE' ? 'TODO' : 'DONE';
};
exports.findIndex = function (array, predicate) {
    var index = -1;
    array.some(function (item, i) {
        if (predicate(item)) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
};
//# sourceMappingURL=utils.js.map