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
import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { Channel } from './channel';
import { logger } from './';
import { getParticipant } from './mock-users';
var CollabProvider = /** @class */ (function () {
    function CollabProvider(config, pubSubClient) {
        var _this = this;
        this.eventEmitter = new EventEmitter2();
        this.queue = [];
        this.getState = function () { };
        this.participants = new Map();
        this.pauseQueue = false;
        this.processRemoteData = function (data, forceApply) {
            if (_this.pauseQueue && !forceApply) {
                logger("Queue is paused. Aborting.");
                return;
            }
            var version = data.version, steps = data.steps;
            logger("Processing data. Version: " + version);
            if (steps && steps.length) {
                var userIds = steps.map(function (step) { return step.userId; });
                _this.emit('data', { json: steps, version: version, userIds: userIds });
            }
            _this.processQeueue();
        };
        this.onReceiveData = function (data, forceApply) {
            var currentVersion = getVersion(_this.getState());
            var expectedVersion = currentVersion + data.steps.length;
            if (data.version === currentVersion) {
                logger("Received data we already have. Ignoring.");
            }
            else if (data.version === expectedVersion) {
                _this.processRemoteData(data, forceApply);
            }
            else if (data.version > expectedVersion) {
                logger("Version too high. Expected " + expectedVersion + " but got " + data.version + ". Current local version is " + currentVersion);
                _this.queueData(data);
            }
        };
        this.onReceiveTelepointer = function (data) {
            var sessionId = data.sessionId;
            if (sessionId === _this.config.userId) {
                return;
            }
            var participant = _this.participants.get(sessionId);
            if (participant && participant.lastActive > data.timestamp) {
                logger("Old telepointer event. Ignoring.");
                return;
            }
            _this.updateParticipant(sessionId, data.timestamp);
            logger("Remote telepointer from " + sessionId);
            _this.emit('telepointer', data);
        };
        this.config = config;
        this.channel = new Channel(config, pubSubClient);
    }
    CollabProvider.prototype.initialize = function (getState) {
        var _this = this;
        this.getState = getState;
        this.channel
            .on('connected', function (_a) {
            var doc = _a.doc, version = _a.version;
            logger("Joined collab-session. The document version is " + version);
            var userId = _this.config.userId;
            _this.emit('init', { sid: userId, doc: doc, version: version }) // Set initial document
                .emit('connected', { sid: userId }); // Let the plugin know that we're connected an ready to go
        })
            .on('data', this.onReceiveData)
            .on('telepointer', this.onReceiveTelepointer)
            .connect();
        return this;
    };
    /**
     * Send steps from transaction to other participants
     */
    CollabProvider.prototype.send = function (tr, oldState, newState) {
        // Ignore transactions without steps
        if (!tr.steps || !tr.steps.length) {
            return;
        }
        this.channel.sendSteps(newState, this.getState);
    };
    /**
     * Send messages, such as telepointers, to other participants.
     */
    CollabProvider.prototype.sendMessage = function (data) {
        if (!data) {
            return;
        }
        var type = data.type;
        switch (type) {
            case 'telepointer':
                this.channel.sendTelepointer(__assign({}, data, { timestamp: new Date().getTime() }));
        }
    };
    CollabProvider.prototype.queueData = function (data) {
        var _this = this;
        logger("Queuing data for version " + data.version);
        var orderedQueue = this.queue.concat([data]).sort(function (a, b) {
            return a.version > b.version ? 1 : -1;
        });
        this.queue = orderedQueue;
        if (!this.queueTimeout && !this.pauseQueue) {
            this.queueTimeout = window.setTimeout(function () {
                _this.catchup();
            }, 1000);
        }
    };
    CollabProvider.prototype.catchup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentVersion, _a, doc, version_1, steps, userId, _b, localSteps, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.pauseQueue = true;
                        logger("Too far behind - fetching data from service");
                        currentVersion = getVersion(this.getState());
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.channel.getSteps(currentVersion)];
                    case 2:
                        _a = _c.sent(), doc = _a.doc, version_1 = _a.version, steps = _a.steps;
                        /**
                         * Remove steps from queue where the version is older than
                         * the version we received from service. Keep steps that might be
                         * newer.
                         */
                        this.queue = this.queue.filter(function (data) { return data.version > version_1; });
                        // We are too far behind - replace the entire document
                        if (doc) {
                            logger("Replacing document.");
                            userId = this.config.userId;
                            _b = (sendableSteps(this.getState()) || {}).steps, localSteps = _b === void 0 ? [] : _b;
                            // Replace local document and version number
                            this.emit('init', { sid: userId, doc: doc, version: version_1 });
                            // Re-aply local steps
                            if (localSteps.length) {
                                this.emit('local-steps', { steps: localSteps });
                            }
                            clearTimeout(this.queueTimeout);
                            this.pauseQueue = false;
                            this.queueTimeout = undefined;
                        }
                        else if (steps) {
                            logger("Applying the new steps. Version: " + version_1);
                            this.onReceiveData({ steps: steps, version: version_1 }, true);
                            clearTimeout(this.queueTimeout);
                            this.pauseQueue = false;
                            this.queueTimeout = undefined;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        logger("Unable to get latest steps: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CollabProvider.prototype.processQeueue = function () {
        if (this.pauseQueue) {
            logger("Queue is paused. Aborting.");
            return;
        }
        logger("Looking for proccessable data");
        if (this.queue.length === 0) {
            return;
        }
        var firstItem = this.queue[0];
        var currentVersion = getVersion(this.getState());
        var expectedVersion = currentVersion + firstItem.steps.length;
        if (firstItem.version === expectedVersion) {
            logger("Applying data from queue!");
            this.queue.splice(0, 1);
            this.processRemoteData(firstItem);
        }
    };
    CollabProvider.prototype.updateParticipant = function (userId, timestamp) {
        var _this = this;
        // TODO: Make batch-request to backend to resolve participants
        var _a = getParticipant(userId), _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.email, email = _c === void 0 ? '' : _c, _d = _a.avatar, avatar = _d === void 0 ? '' : _d;
        this.participants.set(userId, {
            name: name,
            email: email,
            avatar: avatar,
            sessionId: userId,
            lastActive: timestamp,
        });
        var joined = [this.participants.get(userId)];
        // Filter out participants that's been inactive for
        // more than 5 minutes.
        var now = new Date().getTime();
        var left = Array.from(this.participants.values()).filter(function (p) { return (now - p.lastActive) / 1000 > 300; });
        left.forEach(function (p) { return _this.participants.delete(p.sessionId); });
        this.emit('presence', { joined: joined, left: left });
    };
    /**
     * Emit events to subscribers
     */
    CollabProvider.prototype.emit = function (evt, data) {
        this.eventEmitter.emit(evt, data);
        return this;
    };
    /**
     * Subscribe to events emitted by this provider
     */
    CollabProvider.prototype.on = function (evt, handler) {
        this.eventEmitter.on(evt, handler);
        return this;
    };
    /**
     * Unsubscribe from events emitted by this provider
     */
    CollabProvider.prototype.off = function (evt, handler) {
        this.eventEmitter.off(evt, handler);
        return this;
    };
    return CollabProvider;
}());
export { CollabProvider };
