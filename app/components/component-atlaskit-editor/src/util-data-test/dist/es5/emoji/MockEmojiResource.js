"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid = require("uuid/v1");
var util_service_support_1 = require("@atlaskit/util-service-support");
var emoji_1 = require("@atlaskit/emoji");
var utils_1 = require("./utils");
var story_data_1 = require("./story-data");
var emojiFromUpload = function (upload) {
    var shortName = upload.shortName, name = upload.name, dataURL = upload.dataURL, height = upload.height, width = upload.width;
    return {
        id: uuid(),
        shortName: shortName,
        name: name,
        fallback: shortName,
        type: utils_1.customType,
        category: utils_1.customCategory,
        order: -1,
        creatorUserId: story_data_1.loggedUser,
        representation: {
            width: width,
            height: height,
            imagePath: dataURL,
        },
        searchable: true,
    };
};
var MockNonUploadingEmojiResource = /** @class */ (function (_super) {
    tslib_1.__extends(MockNonUploadingEmojiResource, _super);
    function MockNonUploadingEmojiResource(emojiService, config) {
        var _this = _super.call(this) || this;
        _this.lastQuery = '';
        _this.recordedSelections = [];
        _this.currentUser = (config && config.currentUser) || undefined;
        _this.emojiRepository = emojiService;
        _this.promiseBuilder = function (result) { return Promise.resolve(result); };
        if (config) {
            if (config.promiseBuilder) {
                _this.promiseBuilder = config.promiseBuilder;
            }
            _this.optimisticRendering = config.optimisticRendering;
        }
        if (window.localStorage) {
            var storedTone = window.localStorage.getItem(utils_1.selectedToneStorageKey);
            _this.selectedTone = storedTone ? parseInt(storedTone, 10) : undefined;
        }
        return _this;
    }
    MockNonUploadingEmojiResource.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    MockNonUploadingEmojiResource.prototype.filter = function (query, options) {
        var _this = this;
        if (query) {
            this.lastQuery = query;
        }
        else {
            this.lastQuery = '';
        }
        this.promiseBuilder(this.emojiRepository.search(query, options), 'filter').then(function (result) {
            _this.notifyResult(result);
        });
    };
    MockNonUploadingEmojiResource.prototype.findByShortName = function (shortName) {
        var emoji = this.emojiRepository.findByShortName(shortName);
        return this.promiseBuilder(emoji, 'findByShortName');
    };
    MockNonUploadingEmojiResource.prototype.findByEmojiId = function (emojiId) {
        var id = emojiId.id, shortName = emojiId.shortName;
        if (id) {
            var emoji = this.emojiRepository.findById(id);
            return this.promiseBuilder(emoji, 'findByEmojiId');
        }
        return this.emojiRepository.findByShortName(shortName);
    };
    MockNonUploadingEmojiResource.prototype.findById = function (id) {
        var emoji = this.emojiRepository.findById(id);
        return this.promiseBuilder(emoji, 'findById');
    };
    MockNonUploadingEmojiResource.prototype.findInCategory = function (categoryId) {
        var emojis = this.emojiRepository.findInCategory(categoryId);
        return this.promiseBuilder(emojis, 'findInCategory');
    };
    MockNonUploadingEmojiResource.prototype.getAsciiMap = function () {
        return this.promiseBuilder(this.emojiRepository.getAsciiMap(), 'getAsciiMap');
    };
    MockNonUploadingEmojiResource.prototype.getFrequentlyUsed = function (options) {
        return this.promiseBuilder(this.emojiRepository.getFrequentlyUsed(options), 'getFrequentlyUsed');
    };
    MockNonUploadingEmojiResource.prototype.recordSelection = function (emoji) {
        this.recordedSelections.push(emoji);
        this.emojiRepository.used(emoji);
        return this.promiseBuilder(undefined, 'recordSelection');
    };
    MockNonUploadingEmojiResource.prototype.deleteSiteEmoji = function (emoji) {
        this.emojiRepository.delete(emoji);
        this.filter(this.lastQuery);
        return this.promiseBuilder(true, 'deleteSiteEmoji');
    };
    MockNonUploadingEmojiResource.prototype.loadMediaEmoji = function (emoji) {
        return emoji;
    };
    MockNonUploadingEmojiResource.prototype.optimisticMediaRendering = function (emoji) {
        return emoji && !!this.optimisticRendering;
    };
    MockNonUploadingEmojiResource.prototype.getSelectedTone = function () {
        return this.selectedTone;
    };
    MockNonUploadingEmojiResource.prototype.setSelectedTone = function (tone) {
        this.selectedTone = tone;
        if (window.localStorage) {
            try {
                window.localStorage.setItem(utils_1.selectedToneStorageKey, tone ? tone.toString() : '');
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error('failed to store selected emoji skin tone', e);
            }
        }
    };
    MockNonUploadingEmojiResource.prototype.calculateDynamicCategories = function () {
        if (!this.emojiRepository) {
            return Promise.resolve([]);
        }
        return Promise.resolve(this.emojiRepository.getDynamicCategoryList());
    };
    return MockNonUploadingEmojiResource;
}(util_service_support_1.AbstractResource));
exports.MockNonUploadingEmojiResource = MockNonUploadingEmojiResource;
var MockEmojiResource = /** @class */ (function (_super) {
    tslib_1.__extends(MockEmojiResource, _super);
    function MockEmojiResource(emojiService, config) {
        var _this = _super.call(this, emojiService, config) || this;
        _this.uploads = [];
        _this.uploadSupported = false;
        if (config) {
            _this.uploadSupported = !!config.uploadSupported;
            _this.uploadError = config.uploadError;
        }
        return _this;
    }
    MockEmojiResource.prototype.isUploadSupported = function () {
        return this.promiseBuilder(this.uploadSupported, 'isUploadSupported');
    };
    MockEmojiResource.prototype.uploadCustomEmoji = function (upload) {
        if (this.uploadError) {
            return Promise.reject(this.uploadError);
        }
        var emoji = emojiFromUpload(upload);
        this.uploads.push({
            upload: upload,
            emoji: emoji,
        });
        this.emojiRepository.addUnknownEmoji(emoji);
        this.filter(this.lastQuery);
        return this.promiseBuilder(emoji, 'uploadCustomEmoji');
    };
    MockEmojiResource.prototype.getUploads = function () {
        return this.uploads;
    };
    MockEmojiResource.prototype.prepareForUpload = function () {
        return Promise.resolve();
    };
    // Make public for testing
    MockEmojiResource.prototype.notifyNotReady = function () {
        _super.prototype.notifyNotReady.call(this);
    };
    MockEmojiResource.prototype.loadMediaEmoji = function (emoji) {
        if (this.promiseBuilder) {
            return this.promiseBuilder(emoji, 'loadMediaEmoji');
        }
        return emoji;
    };
    return MockEmojiResource;
}(MockNonUploadingEmojiResource));
exports.MockEmojiResource = MockEmojiResource;
var UsageClearEmojiRepository = /** @class */ (function (_super) {
    tslib_1.__extends(UsageClearEmojiRepository, _super);
    function UsageClearEmojiRepository(emojis) {
        return _super.call(this, emojis) || this;
    }
    UsageClearEmojiRepository.prototype.clear = function () {
        this.usageTracker.clear();
    };
    return UsageClearEmojiRepository;
}(emoji_1.EmojiRepository));
var isUsageClearEmojiRepository = function (object) {
    return 'clear' in object;
};
/**
 * An EmojiResource used in storybooks to allow a user a mechanism for clearing their frequently used emoji.
 */
var UsageClearEmojiResource = /** @class */ (function (_super) {
    tslib_1.__extends(UsageClearEmojiResource, _super);
    function UsageClearEmojiResource(emojis) {
        return _super.call(this, new UsageClearEmojiRepository(emojis)) || this;
    }
    UsageClearEmojiResource.prototype.clearFrequentlyUsed = function () {
        if (isUsageClearEmojiRepository(this.emojiRepository)) {
            this.emojiRepository.clear();
        }
    };
    return UsageClearEmojiResource;
}(MockNonUploadingEmojiResource));
exports.UsageClearEmojiResource = UsageClearEmojiResource;
exports.mockNonUploadingEmojiResourceFactory = function (emojiRepository, config, promiseBuilder) {
    var mockEmojiResource = new MockNonUploadingEmojiResource(emojiRepository, config);
    if (promiseBuilder) {
        return promiseBuilder(mockEmojiResource, 'mockNonUploadingEmojiResourceFactory');
    }
    return Promise.resolve(mockEmojiResource);
};
exports.mockEmojiResourceFactory = function (emojiRepository, config, promiseBuilder) {
    var mockEmojiResource = new MockEmojiResource(emojiRepository, config);
    if (promiseBuilder) {
        return promiseBuilder(mockEmojiResource, 'mockEmojiResourceFactory');
    }
    return Promise.resolve(mockEmojiResource);
};
//# sourceMappingURL=MockEmojiResource.js.map