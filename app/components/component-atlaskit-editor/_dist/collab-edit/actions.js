import { receiveTransaction } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import { AllSelection, NodeSelection, } from 'prosemirror-state';
import { replaceDocument } from './utils';
export var handleInit = function (initData, view, options) {
    var doc = initData.doc, json = initData.json, version = initData.version;
    if (doc) {
        var state = view.state;
        var tr = replaceDocument(doc, state, version, options);
        tr.setMeta('isRemote', true);
        var newState = state.apply(tr);
        view.updateState(newState);
    }
    else if (json) {
        applyRemoteSteps(json, undefined, view);
    }
};
export var handleConnection = function (connectionData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('sessionId', connectionData));
};
export var handlePresence = function (presenceData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('presence', presenceData));
};
export var applyRemoteData = function (remoteData, view, options) {
    var json = remoteData.json, newState = remoteData.newState, _a = remoteData.userIds, userIds = _a === void 0 ? [] : _a;
    if (json) {
        applyRemoteSteps(json, userIds, view, options);
    }
    else if (newState) {
        view.updateState(newState);
    }
};
export var applyRemoteSteps = function (json, userIds, view, options) {
    if (!json || !json.length) {
        return;
    }
    var state = view.state, schema = view.state.schema;
    var steps = json.map(function (step) { return Step.fromJSON(schema, step); });
    var tr;
    if (options && options.useNativePlugin && userIds) {
        tr = receiveTransaction(state, steps, userIds);
    }
    else {
        tr = state.tr;
        steps.forEach(function (step) { return tr.step(step); });
    }
    if (tr) {
        tr.setMeta('addToHistory', false);
        tr.setMeta('isRemote', true);
        var _a = state.selection, from = _a.from, to = _a.to;
        var firstStep = json[0];
        /**
         * If the cursor is a the same position as the first step in
         * the remote data, we need to manually set it back again
         * in order to prevent the cursor from moving.
         */
        if (from === firstStep.from && to === firstStep.to) {
            tr.setSelection(state.selection);
        }
        var newState = state.apply(tr);
        view.updateState(newState);
    }
};
export var handleTelePointer = function (telepointerData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('telepointer', telepointerData));
};
function isAllSelection(selection) {
    return selection instanceof AllSelection;
}
function isNodeSelection(selection) {
    return selection instanceof NodeSelection;
}
export var getSendableSelection = function (selection) {
    /**
     * <kbd>CMD + A</kbd> triggers a AllSelection
     * <kbd>escape</kbd> triggers a NodeSelection
     */
    return {
        type: 'textSelection',
        anchor: selection.anchor,
        head: isAllSelection(selection) || isNodeSelection(selection)
            ? selection.head - 1
            : selection.head,
    };
};
