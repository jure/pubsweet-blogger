import * as tslib_1 from "tslib";
import { getServiceDecisionsResponse, getServiceItemsResponse, getServiceTasksResponse, participants, } from './story-data';
import { findIndex, objectKeyToString, toggleTaskState } from './utils';
import { convertServiceItemResponseToItemResponse, convertServiceDecisionResponseToDecisionResponse, convertServiceTaskResponseToTaskResponse, } from '@atlaskit/task-decision';
import * as subMinutes from 'date-fns/sub_minutes';
var debouncedTaskStateQuery = null;
var debouncedTaskToggle = null;
var MockTaskDecisionResource = /** @class */ (function () {
    function MockTaskDecisionResource(config) {
        this.fakeCursor = 0;
        this.lastNewItemTime = new Date();
        this.subscribers = new Map();
        this.cachedItems = new Map();
        this.batchedKeys = new Map();
        this.config = config;
        this.subscribers.clear();
        this.cachedItems.clear();
        this.batchedKeys.clear();
    }
    MockTaskDecisionResource.prototype.getDecisions = function (query) {
        if (this.config) {
            if (this.config.empty) {
                return Promise.resolve({
                    decisions: [],
                });
            }
            if (this.config.error) {
                return Promise.reject('error');
            }
        }
        var serviceDecisionResponse = getServiceDecisionsResponse();
        var result = convertServiceDecisionResponseToDecisionResponse(serviceDecisionResponse);
        return this.applyConfig(query, result, 'decisions');
    };
    MockTaskDecisionResource.prototype.getTasks = function (query) {
        if (this.config) {
            if (this.config.empty) {
                return Promise.resolve({
                    tasks: [],
                });
            }
            if (this.config.error) {
                return Promise.reject('error');
            }
        }
        var serviceTasksResponse = getServiceTasksResponse();
        var result = convertServiceTaskResponseToTaskResponse(serviceTasksResponse);
        return this.applyConfig(query, result, 'tasks');
    };
    MockTaskDecisionResource.prototype.getItems = function (query) {
        if (this.config) {
            if (this.config.empty) {
                return Promise.resolve({
                    items: [],
                });
            }
            if (this.config.error) {
                return Promise.reject('error');
            }
        }
        var serviceItemResponse = getServiceItemsResponse();
        var result = convertServiceItemResponseToItemResponse(serviceItemResponse);
        return this.applyConfig(query, result, 'items');
    };
    MockTaskDecisionResource.prototype.unsubscribeRecentUpdates = function (_id) { };
    MockTaskDecisionResource.prototype.notifyRecentUpdates = function (_updateContext) { };
    MockTaskDecisionResource.prototype.getNextDate = function () {
        // Random 15 minute chunk earlier
        this.lastNewItemTime = subMinutes(this.lastNewItemTime, Math.random() * 50 * 15);
        return this.lastNewItemTime;
    };
    MockTaskDecisionResource.prototype.applyConfig = function (query, result, itemKey) {
        var _this = this;
        var _a;
        var nextQuery;
        if (this.config && this.config.hasMore) {
            nextQuery = tslib_1.__assign({}, query, { cursor: "" + ++this.fakeCursor });
        }
        var newResult = (_a = {},
            _a[itemKey] = result[itemKey].map(function (item) {
                var itemDate = _this.getNextDate();
                return tslib_1.__assign({}, item, { creationDate: itemDate, lastUpdateDate: itemDate, localId: item.localId + "-" + _this.fakeCursor });
            }),
            _a.nextQuery = nextQuery,
            _a);
        var lag = this.config && this.config.lag;
        if (lag) {
            return new Promise(function (resolve) {
                window.setTimeout(function () {
                    resolve(newResult);
                }, lag);
            });
        }
        return Promise.resolve(newResult);
    };
    MockTaskDecisionResource.prototype.getTaskState = function (_keys) {
        return Promise.resolve([
            {
                containerAri: 'ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:conversation/12e445f8-478c-4902-a556-f4866b273033',
                objectAri: 'ari:cloud:app.cloud:f7ebe2c0-0309-4687-b913-41d422f2110b:message/f1328342-7c28-11e7-a5e8-02420aff0003',
                localId: 'bff0c423-3bba-45c4-a310-d49f7a95003e',
                state: 'DONE',
                type: 'TASK',
            },
        ]);
    };
    MockTaskDecisionResource.prototype.toggleTask = function (objectKey, state) {
        var _this = this;
        if (debouncedTaskToggle) {
            clearTimeout(debouncedTaskToggle);
        }
        // Optimistically notify subscribers that the task have been updated so that they can re-render accordingly
        this.notifyUpdated(objectKey, state);
        return new Promise(function (resolve) {
            var key = objectKeyToString(objectKey);
            var cached = _this.cachedItems.get(key);
            if (cached) {
                cached.state = state;
                _this.cachedItems.set(key, cached);
            }
            else {
                _this.cachedItems.set(key, tslib_1.__assign({}, objectKey, { state: state }));
            }
            resolve(state);
            var lag = (_this.config && _this.config.lag) || 0;
            window.setTimeout(function () {
                if (_this.config && _this.config.error) {
                    // Undo optimistic change
                    _this.notifyUpdated(objectKey, toggleTaskState(state));
                }
                else {
                    _this.notifyUpdated(objectKey, state);
                }
            }, 500 + lag);
        });
    };
    MockTaskDecisionResource.prototype.subscribe = function (objectKey, handler) {
        var _this = this;
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key) || [];
        handlers.push(handler);
        this.subscribers.set(key, handlers);
        var cached = this.cachedItems.get(key);
        if (cached) {
            this.notifyUpdated(objectKey, cached.state);
            return;
        }
        if (debouncedTaskStateQuery) {
            clearTimeout(debouncedTaskStateQuery);
        }
        this.queueItem(objectKey);
        debouncedTaskStateQuery = window.setTimeout(function () {
            _this.getTaskState(Array.from(_this.batchedKeys.values())).then(function (tasks) {
                tasks.forEach(function (task) {
                    var containerAri = task.containerAri, objectAri = task.objectAri, localId = task.localId;
                    var objectKey = { containerAri: containerAri, objectAri: objectAri, localId: localId };
                    _this.cachedItems.set(objectKeyToString(objectKey), task);
                    _this.dequeueItem(objectKey);
                    _this.notifyUpdated(objectKey, task.state);
                });
            });
        }, 1);
    };
    MockTaskDecisionResource.prototype.unsubscribe = function (objectKey, handler) {
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key);
        if (!handlers) {
            return;
        }
        var index = findIndex(handlers, function (h) { return h === handler; });
        if (index !== -1) {
            handlers.splice(index, 1);
        }
        if (handlers.length === 0) {
            this.subscribers.delete(key);
        }
        else {
            this.subscribers.set(key, handlers);
        }
    };
    MockTaskDecisionResource.prototype.notifyUpdated = function (objectKey, state) {
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key);
        if (!handlers) {
            return;
        }
        handlers.forEach(function (handler) {
            handler(state);
        });
    };
    MockTaskDecisionResource.prototype.getCurrentUser = function () {
        // Return a random user or undefined from the participants list
        var randomParticipant = Math.floor(Math.random() * participants.length);
        return Math.random() < 0.75 ? participants[randomParticipant] : undefined;
    };
    MockTaskDecisionResource.prototype.queueItem = function (objectKey) {
        var key = objectKeyToString(objectKey);
        if (this.batchedKeys.get(key)) {
            return;
        }
        this.batchedKeys.set(key, objectKey);
    };
    MockTaskDecisionResource.prototype.dequeueItem = function (objectKey) {
        var key = objectKeyToString(objectKey);
        this.batchedKeys.delete(key);
    };
    return MockTaskDecisionResource;
}());
export { MockTaskDecisionResource };
//# sourceMappingURL=MockTaskDecisionResource.js.map