"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MockEmojiResource_1 = require("./MockEmojiResource");
var emoji_1 = require("@atlaskit/emoji");
var test_data_1 = require("./test-data");
var emojisSets;
exports.getStandardEmojiData = function () {
    return require('../json-data/service-data-standard.json');
};
exports.getAtlassianEmojiData = function () {
    return require('../json-data/service-data-atlassian.json');
};
var siteEmojis = {
    emojis: [test_data_1.siteEmojiWtf],
};
exports.loggedUser = 'blackpanther';
exports.getSiteEmojiData = function () {
    return siteEmojis;
};
exports.getAllEmojiData = function () {
    var standardEmojis = exports.getStandardEmojiData();
    var atlassianEmojis = exports.getAtlassianEmojiData();
    var siteEmojis = exports.getSiteEmojiData();
    var standardSprites = (standardEmojis.meta && standardEmojis.meta.spriteSheets) || {};
    var atlassianSprites = (atlassianEmojis.meta && atlassianEmojis.meta.spriteSheets) || {};
    return {
        emojis: tslib_1.__spread(standardEmojis.emojis, atlassianEmojis.emojis, siteEmojis.emojis),
        meta: {
            spriteSheets: tslib_1.__assign({}, standardSprites, atlassianSprites),
        },
    };
};
var getEmojiSet = function (name) {
    if (!emojisSets) {
        var emojis = emoji_1.denormaliseEmojiServiceResponse(exports.getAllEmojiData()).emojis;
        var standardEmojis = emoji_1.denormaliseEmojiServiceResponse(exports.getStandardEmojiData()).emojis;
        var atlassianEmojis = emoji_1.denormaliseEmojiServiceResponse(exports.getAtlassianEmojiData()).emojis;
        var siteEmojis_1 = emoji_1.denormaliseEmojiServiceResponse(exports.getSiteEmojiData())
            .emojis;
        emojisSets = new Map();
        emojisSets.set('all', emojis);
        emojisSets.set('standard', standardEmojis);
        emojisSets.set('atlassian', atlassianEmojis);
        emojisSets.set('site', siteEmojis_1);
    }
    return emojisSets.get(name) || [];
};
exports.getStandardEmojis = function () { return getEmojiSet('standard'); };
exports.getAtlassianEmojis = function () { return getEmojiSet('atlassian'); };
exports.getSiteEmojis = function () { return getEmojiSet('site'); };
exports.getEmojis = function () { return getEmojiSet('all'); };
exports.lorem = "\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,\n  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem\n  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,\n  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec\n  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,\n  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et\n  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.\n  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet\n  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur\n  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,\n  a semper massa dignissim nec.\n";
exports.getEmojiRepository = function () { return new emoji_1.EmojiRepository(exports.getEmojis()); };
exports.getEmojiResource = function (config) {
    return MockEmojiResource_1.mockEmojiResourceFactory(exports.getEmojiRepository(), config);
};
exports.getEmojiResourceWithStandardAndAtlassianEmojis = function (config) {
    var standardEmojis = exports.getStandardEmojis();
    var atlassianEmojis = exports.getAtlassianEmojis();
    return MockEmojiResource_1.mockEmojiResourceFactory(new emoji_1.EmojiRepository(tslib_1.__spread(standardEmojis, atlassianEmojis)), config);
};
exports.getUsageClearEmojiResource = function () {
    return new MockEmojiResource_1.UsageClearEmojiResource(exports.getEmojis());
};
//# sourceMappingURL=story-data.js.map