"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var emoji_1 = require("@atlaskit/emoji");
var utils_1 = require("./utils");
var MockEmojiResource_1 = require("./MockEmojiResource");
exports.spriteEmoji = {
    id: 'grimacing',
    shortName: ':grimacing:',
    name: 'Grimacing',
    type: 'standard',
    category: 'PEOPLE',
    order: 666,
    representation: {
        sprite: {
            url: 'https://path-to-spritesheet.png',
            row: 6,
            column: 6,
            height: 1024,
            width: 1024,
        },
        xIndex: 1,
        yIndex: 1,
        x: 123,
        y: 456,
        height: 72,
        width: 72,
    },
    searchable: true,
};
exports.imageEmoji = {
    id: 'grimacing',
    shortName: ':grimacing:',
    name: 'Grimacing',
    type: 'standard',
    category: 'PEOPLE',
    order: 777,
    representation: {
        imagePath: 'https://path-to-image.png',
        width: 24,
        height: 24,
    },
    altRepresentation: {
        imagePath: 'https://alt-path-to-image.png',
        width: 48,
        height: 48,
    },
    searchable: true,
};
exports.mediaBaseUrl = 'https://media.example.com/';
exports.mediaEmojiImagePath = exports.mediaBaseUrl + "path-to-image.png";
exports.mediaEmojiAlternateImagePath = exports.mediaBaseUrl + "alt-path-to-image.png";
exports.mediaServiceEmoji = {
    id: 'media',
    shortName: ':media:',
    name: 'Media example',
    fallback: ':media:',
    type: utils_1.customType,
    category: utils_1.customCategory,
    order: -2,
    representation: {
        imagePath: exports.mediaEmojiImagePath,
        width: 24,
        height: 24,
    },
    altRepresentations: {
        XHDPI: {
            imagePath: exports.mediaEmojiAlternateImagePath,
            width: 48,
            height: 48,
        },
    },
    searchable: true,
};
exports.mediaEmojiId = {
    id: 'media',
    shortName: ':media:',
    fallback: ':media:',
};
exports.mediaEmoji = tslib_1.__assign({}, exports.mediaEmojiId, { name: 'Media example', type: utils_1.customType, category: utils_1.customCategory, order: -2, representation: {
        mediaPath: exports.mediaEmojiImagePath,
        width: 24,
        height: 24,
    }, altRepresentation: {
        mediaPath: exports.mediaEmojiAlternateImagePath,
        width: 48,
        height: 48,
    }, skinVariations: [], searchable: true });
exports.siteEmojiFoo = {
    id: 'foo',
    name: 'foo',
    fallback: ':foo:',
    type: 'SITE',
    category: 'CUSTOM',
    order: -1000,
    searchable: true,
    shortName: ':foo:',
    creatorUserId: 'hulk',
    representation: {
        height: 72,
        width: 92,
        imagePath: 'https://image-path-foo.png',
    },
    skinVariations: [],
};
exports.siteEmojiWtf = {
    id: 'wtf',
    name: 'wtf',
    fallback: ':wtf:',
    type: 'SITE',
    category: 'CUSTOM',
    order: -1000,
    searchable: true,
    shortName: ':wtf:',
    creatorUserId: 'Thor',
    representation: {
        height: 120,
        width: 100,
        imagePath: 'https://pf-emoji-service--cdn.useast.atlassian.io/atlassian/wtf@4x.png',
    },
    skinVariations: [],
};
exports.expiresAt = function (offsetSeconds) {
    if (offsetSeconds === void 0) { offsetSeconds = 0; }
    return Math.floor(Date.now() / 1000) + offsetSeconds;
};
// () => MediaApiToken
exports.defaultMediaApiToken = function () { return ({
    url: exports.mediaBaseUrl,
    clientId: '1234',
    jwt: 'abcd',
    collectionName: 'emoji-collection',
    expiresAt: exports.expiresAt(60),
}); };
// tslint:disable-next-line:no-var-requires
exports.standardServiceEmojis = require('../json-data/test-emoji-standard.json'); // EmojiServiceResponse
// tslint:disable-next-line:no-var-requires
exports.atlassianServiceEmojis = require('../json-data/test-emoji-atlassian.json'); // EmojiServiceResponse
exports.siteServiceEmojis = function () { return ({
    emojis: [exports.mediaServiceEmoji],
    meta: {
        mediaApiToken: exports.defaultMediaApiToken(),
    },
}); };
exports.filterToSearchable = function (emojis) {
    return emojis.filter(function (emoji) { return emoji.searchable; });
};
// EmojiDescription[]
exports.standardEmojis = emoji_1.denormaliseEmojiServiceResponse(exports.standardServiceEmojis).emojis;
exports.atlassianEmojis = emoji_1.denormaliseEmojiServiceResponse(exports.atlassianServiceEmojis).emojis;
exports.siteEmojis = [exports.mediaEmoji];
exports.emojis = tslib_1.__spread(exports.standardEmojis, exports.atlassianEmojis, exports.siteEmojis);
exports.searchableEmojis = exports.filterToSearchable(exports.emojis);
// EmojiReposity using TestUsageFrequencyTracker
var TestEmojiRepository = /** @class */ (function (_super) {
    tslib_1.__extends(TestEmojiRepository, _super);
    function TestEmojiRepository(emojis) {
        var _this = _super.call(this, emojis) || this;
        _this.usageTracker = new emoji_1.UsageFrequencyTracker(false);
        return _this;
    }
    return TestEmojiRepository;
}(emoji_1.EmojiRepository));
exports.newEmojiRepository = function () {
    return new TestEmojiRepository(exports.emojis);
};
exports.newSiteEmojiRepository = function () {
    return new emoji_1.EmojiRepository(exports.siteEmojis);
};
var defaultEmojiRepository = exports.newEmojiRepository();
// EmojiDescriptionWithVariations
exports.smileyEmoji = defaultEmojiRepository.findByShortName(':smiley:');
exports.openMouthEmoji = defaultEmojiRepository.findByShortName(':open_mouth:');
exports.grinEmoji = defaultEmojiRepository.findByShortName(':grin:');
exports.evilburnsEmoji = defaultEmojiRepository.findByShortName(':evilburns:');
exports.thumbsupEmoji = defaultEmojiRepository.findByShortName(':thumbsup:');
exports.thumbsdownEmoji = defaultEmojiRepository.findByShortName(':thumbsdown:');
exports.standardBoomEmoji = defaultEmojiRepository.findById('1f4a5');
exports.atlassianBoomEmoji = defaultEmojiRepository.findById('atlassian-boom');
exports.blackFlagEmoji = defaultEmojiRepository.findByShortName(':flag_black:');
exports.congoFlagEmoji = defaultEmojiRepository.findByShortName(':flag_cg:');
exports.getNonUploadingEmojiResourcePromise = function (config) { return MockEmojiResource_1.mockNonUploadingEmojiResourceFactory(exports.newEmojiRepository(), config); };
exports.getEmojiResourcePromise = function (config) {
    return MockEmojiResource_1.mockEmojiResourceFactory(exports.newEmojiRepository(), config);
};
exports.getEmojiResourcePromiseFromRepository = function (repo, config) { return MockEmojiResource_1.mockEmojiResourceFactory(repo, config); };
//# sourceMappingURL=test-data.js.map