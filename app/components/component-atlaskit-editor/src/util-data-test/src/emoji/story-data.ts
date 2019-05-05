import {
  mockEmojiResourceFactory,
  UsageClearEmojiResource,
  MockEmojiResourceConfig,
} from './MockEmojiResource';
import {
  EmojiDescription,
  EmojiServiceResponse,
  EmojiRepository,
  denormaliseEmojiServiceResponse,
} from '@atlaskit/emoji';
import { siteEmojiWtf } from './test-data';

let emojisSets: Map<string, any[]>;

declare var require: {
  <T>(path: string): T;
};

export const getStandardEmojiData = (): EmojiServiceResponse =>
  require('../json-data/service-data-standard.json') as EmojiServiceResponse;
export const getAtlassianEmojiData = (): EmojiServiceResponse =>
  require('../json-data/service-data-atlassian.json') as EmojiServiceResponse;

const siteEmojis = {
  emojis: [siteEmojiWtf],
};

export const loggedUser = 'blackpanther';

export const getSiteEmojiData = (): EmojiServiceResponse =>
  siteEmojis as EmojiServiceResponse;

export const getAllEmojiData = (): EmojiServiceResponse => {
  const standardEmojis = getStandardEmojiData();
  const atlassianEmojis = getAtlassianEmojiData();
  const siteEmojis = getSiteEmojiData();
  const standardSprites =
    (standardEmojis.meta && standardEmojis.meta.spriteSheets) || {};
  const atlassianSprites =
    (atlassianEmojis.meta && atlassianEmojis.meta.spriteSheets) || {};
  return {
    emojis: [
      ...standardEmojis.emojis,
      ...atlassianEmojis.emojis,
      ...siteEmojis.emojis,
    ],
    meta: {
      spriteSheets: {
        ...standardSprites,
        ...atlassianSprites,
      },
    },
  };
};

const getEmojiSet = (name: string) => {
  if (!emojisSets) {
    const emojis = denormaliseEmojiServiceResponse(getAllEmojiData()).emojis;
    const standardEmojis = denormaliseEmojiServiceResponse(
      getStandardEmojiData(),
    ).emojis;
    const atlassianEmojis = denormaliseEmojiServiceResponse(
      getAtlassianEmojiData(),
    ).emojis;
    const siteEmojis = denormaliseEmojiServiceResponse(getSiteEmojiData())
      .emojis;

    emojisSets = new Map<string, any[]>();
    emojisSets.set('all', emojis);
    emojisSets.set('standard', standardEmojis);
    emojisSets.set('atlassian', atlassianEmojis);
    emojisSets.set('site', siteEmojis);
  }
  return emojisSets.get(name) || [];
};

export const getStandardEmojis = () => getEmojiSet('standard');
export const getAtlassianEmojis = () => getEmojiSet('atlassian');
export const getSiteEmojis = () => getEmojiSet('site');
export const getEmojis = () => getEmojiSet('all');

export const lorem = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et
  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
  a semper massa dignissim nec.
`;

export const getEmojiRepository = (): any => new EmojiRepository(getEmojis());

export const getEmojiResource = (config?: MockEmojiResourceConfig) =>
  mockEmojiResourceFactory(getEmojiRepository(), config);

export const getEmojiResourceWithStandardAndAtlassianEmojis = (
  config?: MockEmojiResourceConfig,
) => {
  const standardEmojis: EmojiDescription[] = getStandardEmojis();
  const atlassianEmojis: EmojiDescription[] = getAtlassianEmojis();
  return mockEmojiResourceFactory(
    new EmojiRepository([...standardEmojis, ...atlassianEmojis]),
    config,
  );
};

export const getUsageClearEmojiResource = (): UsageClearEmojiResource =>
  new UsageClearEmojiResource(getEmojis());
