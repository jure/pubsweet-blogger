export * from './types';
export { CollabProvider } from './collab-provider';
export var logger = function (msg, data, style) {
    if (data === void 0) { data = null; }
    if (style === void 0) { style = 'color:blue;font-weight:bold;'; }
    // tslint:disable-next-line:no-console
    console.log("%cCollab-Edit: " + msg, style);
    if (data) {
        // tslint:disable-next-line:no-console
        console.log(data);
    }
};
