import * as tslib_1 from "tslib";
import { mockEmojiResourceFactory, UsageClearEmojiResource, } from './MockEmojiResource';
import { EmojiRepository, denormaliseEmojiServiceResponse, } from '@atlaskit/emoji';
import { siteEmojiWtf } from './test-data';
var emojisSets;
export var getStandardEmojiData = function () {
    return require('../json-data/service-data-standard.json');
};
export var getAtlassianEmojiData = function () {
    return require('../json-data/service-data-atlassian.json');
};
var siteEmojis = {
    emojis: [siteEmojiWtf],
};
export var loggedUser = 'blackpanther';
export var getSiteEmojiData = function () {
    return siteEmojis;
};
export var getAllEmojiData = function () {
    var standardEmojis = getStandardEmojiData();
    var atlassianEmojis = getAtlassianEmojiData();
    var siteEmojis = getSiteEmojiData();
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
        var emojis = denormaliseEmojiServiceResponse(getAllEmojiData()).emojis;
        var standardEmojis = denormaliseEmojiServiceResponse(getStandardEmojiData()).emojis;
        var atlassianEmojis = denormaliseEmojiServiceResponse(getAtlassianEmojiData()).emojis;
        var siteEmojis_1 = denormaliseEmojiServiceResponse(getSiteEmojiData())
            .emojis;
        emojisSets = new Map();
        emojisSets.set('all', emojis);
        emojisSets.set('standard', standardEmojis);
        emojisSets.set('atlassian', atlassianEmojis);
        emojisSets.set('site', siteEmojis_1);
    }
    return emojisSets.get(name) || [];
};
export var getStandardEmojis = function () { return getEmojiSet('standard'); };
export var getAtlassianEmojis = function () { return getEmojiSet('atlassian'); };
export var getSiteEmojis = function () { return getEmojiSet('site'); };
export var getEmojis = function () { return getEmojiSet('all'); };
export var lorem = "\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,\n  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem\n  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,\n  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec\n  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,\n  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et\n  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.\n  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet\n  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur\n  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,\n  a semper massa dignissim nec.\n";
export var getEmojiRepository = function () { return new EmojiRepository(getEmojis()); };
export var getEmojiResource = function (config) {
    return mockEmojiResourceFactory(getEmojiRepository(), config);
};
export var getEmojiResourceWithStandardAndAtlassianEmojis = function (config) {
    var standardEmojis = getStandardEmojis();
    var atlassianEmojis = getAtlassianEmojis();
    return mockEmojiResourceFactory(new EmojiRepository(tslib_1.__spread(standardEmojis, atlassianEmojis)), config);
};
export var getUsageClearEmojiResource = function () {
    return new UsageClearEmojiResource(getEmojis());
};
//# sourceMappingURL=story-data.js.map