import * as tslib_1 from "tslib";
import { EmojiRepository, denormaliseEmojiServiceResponse, UsageFrequencyTracker, } from '@atlaskit/emoji';
import { customCategory, customType } from './utils';
import { mockNonUploadingEmojiResourceFactory, mockEmojiResourceFactory, } from './MockEmojiResource';
export var spriteEmoji = {
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
export var imageEmoji = {
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
export var mediaBaseUrl = 'https://media.example.com/';
export var mediaEmojiImagePath = mediaBaseUrl + "path-to-image.png";
export var mediaEmojiAlternateImagePath = mediaBaseUrl + "alt-path-to-image.png";
export var mediaServiceEmoji = {
    id: 'media',
    shortName: ':media:',
    name: 'Media example',
    fallback: ':media:',
    type: customType,
    category: customCategory,
    order: -2,
    representation: {
        imagePath: mediaEmojiImagePath,
        width: 24,
        height: 24,
    },
    altRepresentations: {
        XHDPI: {
            imagePath: mediaEmojiAlternateImagePath,
            width: 48,
            height: 48,
        },
    },
    searchable: true,
};
export var mediaEmojiId = {
    id: 'media',
    shortName: ':media:',
    fallback: ':media:',
};
export var mediaEmoji = tslib_1.__assign({}, mediaEmojiId, { name: 'Media example', type: customType, category: customCategory, order: -2, representation: {
        mediaPath: mediaEmojiImagePath,
        width: 24,
        height: 24,
    }, altRepresentation: {
        mediaPath: mediaEmojiAlternateImagePath,
        width: 48,
        height: 48,
    }, skinVariations: [], searchable: true });
export var siteEmojiFoo = {
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
export var siteEmojiWtf = {
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
export var expiresAt = function (offsetSeconds) {
    if (offsetSeconds === void 0) { offsetSeconds = 0; }
    return Math.floor(Date.now() / 1000) + offsetSeconds;
};
// () => MediaApiToken
export var defaultMediaApiToken = function () { return ({
    url: mediaBaseUrl,
    clientId: '1234',
    jwt: 'abcd',
    collectionName: 'emoji-collection',
    expiresAt: expiresAt(60),
}); };
// tslint:disable-next-line:no-var-requires
export var standardServiceEmojis = require('../json-data/test-emoji-standard.json'); // EmojiServiceResponse
// tslint:disable-next-line:no-var-requires
export var atlassianServiceEmojis = require('../json-data/test-emoji-atlassian.json'); // EmojiServiceResponse
export var siteServiceEmojis = function () { return ({
    emojis: [mediaServiceEmoji],
    meta: {
        mediaApiToken: defaultMediaApiToken(),
    },
}); };
export var filterToSearchable = function (emojis) {
    return emojis.filter(function (emoji) { return emoji.searchable; });
};
// EmojiDescription[]
export var standardEmojis = denormaliseEmojiServiceResponse(standardServiceEmojis).emojis;
export var atlassianEmojis = denormaliseEmojiServiceResponse(atlassianServiceEmojis).emojis;
export var siteEmojis = [mediaEmoji];
export var emojis = tslib_1.__spread(standardEmojis, atlassianEmojis, siteEmojis);
export var searchableEmojis = filterToSearchable(emojis);
// EmojiReposity using TestUsageFrequencyTracker
var TestEmojiRepository = /** @class */ (function (_super) {
    tslib_1.__extends(TestEmojiRepository, _super);
    function TestEmojiRepository(emojis) {
        var _this = _super.call(this, emojis) || this;
        _this.usageTracker = new UsageFrequencyTracker(false);
        return _this;
    }
    return TestEmojiRepository;
}(EmojiRepository));
export var newEmojiRepository = function () {
    return new TestEmojiRepository(emojis);
};
export var newSiteEmojiRepository = function () {
    return new EmojiRepository(siteEmojis);
};
var defaultEmojiRepository = newEmojiRepository();
// EmojiDescriptionWithVariations
export var smileyEmoji = defaultEmojiRepository.findByShortName(':smiley:');
export var openMouthEmoji = defaultEmojiRepository.findByShortName(':open_mouth:');
export var grinEmoji = defaultEmojiRepository.findByShortName(':grin:');
export var evilburnsEmoji = defaultEmojiRepository.findByShortName(':evilburns:');
export var thumbsupEmoji = defaultEmojiRepository.findByShortName(':thumbsup:');
export var thumbsdownEmoji = defaultEmojiRepository.findByShortName(':thumbsdown:');
export var standardBoomEmoji = defaultEmojiRepository.findById('1f4a5');
export var atlassianBoomEmoji = defaultEmojiRepository.findById('atlassian-boom');
export var blackFlagEmoji = defaultEmojiRepository.findByShortName(':flag_black:');
export var congoFlagEmoji = defaultEmojiRepository.findByShortName(':flag_cg:');
export var getNonUploadingEmojiResourcePromise = function (config) { return mockNonUploadingEmojiResourceFactory(newEmojiRepository(), config); };
export var getEmojiResourcePromise = function (config) {
    return mockEmojiResourceFactory(newEmojiRepository(), config);
};
export var getEmojiResourcePromiseFromRepository = function (repo, config) { return mockEmojiResourceFactory(repo, config); };
//# sourceMappingURL=test-data.js.map