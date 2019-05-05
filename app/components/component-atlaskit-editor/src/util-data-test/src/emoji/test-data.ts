import {
  EmojiRepository,
  denormaliseEmojiServiceResponse,
  EmojiDescription,
  UsageFrequencyTracker,
} from '@atlaskit/emoji';
import { customCategory, customType } from './utils';
import {
  mockNonUploadingEmojiResourceFactory,
  mockEmojiResourceFactory,
  MockEmojiResourceConfig,
} from './MockEmojiResource';

export const spriteEmoji = {
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

export const imageEmoji = {
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

export const mediaBaseUrl = 'https://media.example.com/';
export const mediaEmojiImagePath = `${mediaBaseUrl}path-to-image.png`;
export const mediaEmojiAlternateImagePath = `${mediaBaseUrl}alt-path-to-image.png`;

export const mediaServiceEmoji = {
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

export const mediaEmojiId = {
  id: 'media',
  shortName: ':media:',
  fallback: ':media:',
};

export const mediaEmoji = {
  ...mediaEmojiId,
  name: 'Media example',
  type: customType,
  category: customCategory,
  order: -2,
  representation: {
    mediaPath: mediaEmojiImagePath,
    width: 24,
    height: 24,
  },
  altRepresentation: {
    mediaPath: mediaEmojiAlternateImagePath,
    width: 48,
    height: 48,
  },
  skinVariations: [],
  searchable: true,
};

export const siteEmojiFoo = {
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

export const siteEmojiWtf = {
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
    imagePath:
      'https://pf-emoji-service--cdn.useast.atlassian.io/atlassian/wtf@4x.png',
  },
  skinVariations: [],
};

export const expiresAt = (offsetSeconds: number = 0): number =>
  Math.floor(Date.now() / 1000) + offsetSeconds;

// () => MediaApiToken
export const defaultMediaApiToken = () => ({
  url: mediaBaseUrl,
  clientId: '1234',
  jwt: 'abcd',
  collectionName: 'emoji-collection',
  expiresAt: expiresAt(60), // seconds since Epoch UTC
});

declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const standardServiceEmojis = require('../json-data/test-emoji-standard.json') as any; // EmojiServiceResponse
// tslint:disable-next-line:no-var-requires
export const atlassianServiceEmojis = require('../json-data/test-emoji-atlassian.json') as any; // EmojiServiceResponse
export const siteServiceEmojis = () => ({
  emojis: [mediaServiceEmoji],
  meta: {
    mediaApiToken: defaultMediaApiToken(),
  },
});

export const filterToSearchable = (emojis: EmojiDescription[]) => {
  return emojis.filter(emoji => emoji.searchable);
};

// EmojiDescription[]
export const standardEmojis: any[] = denormaliseEmojiServiceResponse(
  standardServiceEmojis,
).emojis;
export const atlassianEmojis: any[] = denormaliseEmojiServiceResponse(
  atlassianServiceEmojis,
).emojis;
export const siteEmojis = [mediaEmoji];
export const emojis = [...standardEmojis, ...atlassianEmojis, ...siteEmojis];
export const searchableEmojis = filterToSearchable(emojis);

// EmojiReposity using TestUsageFrequencyTracker
class TestEmojiRepository extends EmojiRepository {
  constructor(emojis: EmojiDescription[]) {
    super(emojis);
    this.usageTracker = new UsageFrequencyTracker(false);
  }
}

export const newEmojiRepository: () => any = () =>
  new TestEmojiRepository(emojis);
export const newSiteEmojiRepository: () => any = () =>
  new EmojiRepository(siteEmojis);

const defaultEmojiRepository = newEmojiRepository();

// EmojiDescriptionWithVariations
export const smileyEmoji = defaultEmojiRepository.findByShortName(':smiley:');
export const openMouthEmoji = defaultEmojiRepository.findByShortName(
  ':open_mouth:',
) as any;
export const grinEmoji = defaultEmojiRepository.findByShortName(':grin:');
export const evilburnsEmoji = defaultEmojiRepository.findByShortName(
  ':evilburns:',
);
export const thumbsupEmoji = defaultEmojiRepository.findByShortName(
  ':thumbsup:',
);
export const thumbsdownEmoji = defaultEmojiRepository.findByShortName(
  ':thumbsdown:',
);
export const standardBoomEmoji = defaultEmojiRepository.findById('1f4a5');
export const atlassianBoomEmoji = defaultEmojiRepository.findById(
  'atlassian-boom',
);
export const blackFlagEmoji = defaultEmojiRepository.findByShortName(
  ':flag_black:',
);
export const congoFlagEmoji = defaultEmojiRepository.findByShortName(
  ':flag_cg:',
);

export const getNonUploadingEmojiResourcePromise = (
  config?: MockEmojiResourceConfig,
) => mockNonUploadingEmojiResourceFactory(newEmojiRepository(), config);

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig) =>
  mockEmojiResourceFactory(newEmojiRepository(), config);

export const getEmojiResourcePromiseFromRepository = (
  repo: EmojiRepository,
  config?: MockEmojiResourceConfig,
) => mockEmojiResourceFactory(repo, config);
