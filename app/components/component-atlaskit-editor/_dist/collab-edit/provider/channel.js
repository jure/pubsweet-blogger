var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { utils } from '@atlaskit/util-service-support';
import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { logger } from './';
var Channel = /** @class */ (function () {
    function Channel(config, pubSubClient) {
        this.eventEmitter = new EventEmitter2();
        this.config = config;
        this.pubSubClient = pubSubClient;
    }
    /**
     * Get initial document from service
     */
    Channel.prototype.getDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, doc, version, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document/" + this.config.docId,
                            })];
                    case 1:
                        _a = _b.sent(), doc = _a.doc, version = _a.version;
                        return [2 /*return*/, {
                                doc: doc,
                                version: version,
                            }];
                    case 2:
                        err_1 = _b.sent();
                        logger("Collab-Edit: Document \"" + this.config.docId + "\" does not exist. Creating one locally.");
                        return [2 /*return*/, {
                                doc: {},
                                version: 1,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Connect to pubsub to start receiving events
     */
    Channel.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docId, _a, doc, version;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('connect() in channel called');
                        docId = this.config.docId;
                        return [4 /*yield*/, this.getDocument()];
                    case 1:
                        _a = _b.sent(), doc = _a.doc, version = _a.version;
                        this.pubSubClient.on('connect', function () {
                            logger('Connected to FPS-service');
                        });
                        this.pubSubClient.join("collab-service/" + docId);
                        this.pubSubClient
                            .on('steps:created', function (payload) {
                            logger('Received FPS-payload', { payload: payload });
                            _this.emit('data', payload);
                        })
                            .on('telepointer:updated', function (payload) {
                            logger('Received telepointer-payload', { payload: payload });
                            _this.emit('telepointer', payload);
                        });
                        this.eventEmitter.emit('connected', {
                            doc: doc,
                            version: version,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Channel.prototype.debounce = function (getState) {
        var _this = this;
        logger("Debouncing steps");
        if (this.debounced) {
            clearTimeout(this.debounced);
        }
        this.debounced = window.setTimeout(function () {
            logger("Sending debounced");
            _this.sendSteps(getState(), getState);
        }, 250);
    };
    /**
     * Send steps to service
     */
    Channel.prototype.sendSteps = function (state, getState, localSteps) {
        return __awaiter(this, void 0, void 0, function () {
            var version, steps, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isSending) {
                            this.debounce(getState);
                            return [2 /*return*/];
                        }
                        version = getVersion(state);
                        // Don't send any steps before we're ready.
                        if (typeof version === undefined) {
                            return [2 /*return*/];
                        }
                        steps = (localSteps ||
                            sendableSteps(state) || { steps: [] }).steps;
                        if (steps.length === 0) {
                            logger("No steps to send. Aborting.");
                            return [2 /*return*/];
                        }
                        this.isSending = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document/" + this.config.docId + "/steps",
                                requestInit: {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        version: version,
                                        steps: steps,
                                    }),
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        this.isSending = false;
                        logger("Steps sent and accepted by service.");
                        this.emit('data', response);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        this.isSending = false;
                        logger("Error sending steps: \"" + JSON.stringify(err_2) + " " + err_2.stack + "\"");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get steps from version x to latest
     */
    Channel.prototype.getSteps = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils.requestService(this.config, {
                            path: "document/" + this.config.docId + "/steps",
                            queryParams: {
                                version: version,
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Send telepointer
     */
    Channel.prototype.sendTelepointer = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger("Sending telepointer", data);
                        return [4 /*yield*/, utils.requestService(this.config, {
                                path: "document/" + this.config.docId + "/telepointer",
                                requestInit: {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data),
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Subscribe to events emitted by this channel
     */
    Channel.prototype.on = function (evt, handler) {
        this.eventEmitter.on(evt, handler);
        return this;
    };
    /**
     * Unsubscribe from events emitted by this channel
     */
    Channel.prototype.off = function (evt, handler) {
        this.eventEmitter.off(evt, handler);
        return this;
    };
    /**
     * Emit events to subscribers
     */
    Channel.prototype.emit = function (evt, data) {
        this.eventEmitter.emit(evt, data);
        return this;
    };
    return Channel;
}());
export { Channel };
