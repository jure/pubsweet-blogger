import { Selection } from 'prosemirror-state';
import { Decoration } from 'prosemirror-view';
import { colors as themeColors } from '@atlaskit/theme';
import { hexToRgba } from '@atlaskit/editor-common';
import { processRawValue } from '@atlaskit/editor-core/utils';
export var colors = [
    themeColors.R100,
    themeColors.R300,
    themeColors.R500,
    themeColors.Y100,
    themeColors.Y300,
    themeColors.Y500,
    themeColors.G100,
    themeColors.G300,
    themeColors.G500,
    themeColors.T100,
    themeColors.T300,
    themeColors.T500,
    themeColors.B100,
    themeColors.B300,
    themeColors.B500,
    themeColors.P100,
    themeColors.P300,
    themeColors.P500,
    themeColors.N70,
    themeColors.N200,
    themeColors.N800,
].map(function (solid) { return ({
    solid: solid,
    selection: hexToRgba(solid, 0.2),
}); });
// tslint:disable:no-bitwise
export var getAvatarColor = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash;
    }
    var index = Math.abs(hash) % colors.length;
    return { index: index, color: colors[index] };
};
// tslint:enable:no-bitwise
export var findPointers = function (id, decorations) {
    return decorations
        .find()
        .reduce(function (arr, deco) {
        return deco.spec.pointer.sessionId === id ? arr.concat(deco) : arr;
    }, []);
};
function style(options) {
    var color = (options && options.color) || 'black';
    return "border-left: 1px solid " + color + "; border-right: 1px solid " + color + "; margin-right: -2px;";
}
export var createTelepointers = function (from, to, sessionId, isSelection, initial) {
    var decorations = [];
    var avatarColor = getAvatarColor(sessionId);
    var color = avatarColor.index.toString();
    if (isSelection) {
        var className = "telepointer color-" + color + " telepointer-selection";
        decorations.push(Decoration.inline(from, to, { class: className, 'data-initial': initial }, { pointer: { sessionId: sessionId } }));
    }
    var cursor = document.createElement('span');
    cursor.textContent = '\u200b';
    cursor.className = "telepointer color-" + color + " telepointer-selection-badge";
    cursor.style.cssText = style({ color: avatarColor.color.solid }) + ";";
    cursor.setAttribute('data-initial', initial);
    return decorations.concat(Decoration.widget(to, cursor, { pointer: { sessionId: sessionId } }));
};
export var replaceDocument = function (doc, state, version, options) {
    var schema = state.schema, tr = state.tr;
    var content;
    var hasContent;
    // This can be default when we fix the unsupported nodes we currently produce.
    if (options && options.allowUnsupportedContent) {
        // Process the value coming in, this allows us to wrap blocks unknown to us.
        // Instead of throwing an error at this point.
        content = processRawValue(state.schema, doc);
        hasContent = !!content;
    }
    else {
        content = (doc.content || []).map(function (child) {
            return schema.nodeFromJSON(child);
        });
        hasContent = Array.isArray(content) ? !!content.length : !!content;
    }
    if (hasContent) {
        tr.setMeta('addToHistory', false);
        tr.replaceWith(0, state.doc.nodeSize - 2, content);
        tr.setSelection(Selection.atStart(tr.doc));
        if (typeof version !== undefined && (options && options.useNativePlugin)) {
            var collabState = { version: version, unconfirmed: [] };
            tr.setMeta('collab$', collabState);
        }
    }
    return tr;
};
