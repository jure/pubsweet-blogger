import { EmojiRepository, EmojiDescription } from '@atlaskit/emoji';
import { MockEmojiResourceConfig } from './MockEmojiResource';
export declare const spriteEmoji: {
    id: string;
    shortName: string;
    name: string;
    type: string;
    category: string;
    order: number;
    representation: {
        sprite: {
            url: string;
            row: number;
            column: number;
            height: number;
            width: number;
        };
        xIndex: number;
        yIndex: number;
        x: number;
        y: number;
        height: number;
        width: number;
    };
    searchable: boolean;
};
export declare const imageEmoji: {
    id: string;
    shortName: string;
    name: string;
    type: string;
    category: string;
    order: number;
    representation: {
        imagePath: string;
        width: number;
        height: number;
    };
    altRepresentation: {
        imagePath: string;
        width: number;
        height: number;
    };
    searchable: boolean;
};
export declare const mediaBaseUrl = "https://media.example.com/";
export declare const mediaEmojiImagePath: string;
export declare const mediaEmojiAlternateImagePath: string;
export declare const mediaServiceEmoji: {
    id: string;
    shortName: string;
    name: string;
    fallback: string;
    type: string;
    category: string;
    order: number;
    representation: {
        imagePath: string;
        width: number;
        height: number;
    };
    altRepresentations: {
        XHDPI: {
            imagePath: string;
            width: number;
            height: number;
        };
    };
    searchable: boolean;
};
export declare const mediaEmojiId: {
    id: string;
    shortName: string;
    fallback: string;
};
export declare const mediaEmoji: {
    name: string;
    type: string;
    category: string;
    order: number;
    representation: {
        mediaPath: string;
        width: number;
        height: number;
    };
    altRepresentation: {
        mediaPath: string;
        width: number;
        height: number;
    };
    skinVariations: never[];
    searchable: boolean;
    id: string;
    shortName: string;
    fallback: string;
};
export declare const siteEmojiFoo: {
    id: string;
    name: string;
    fallback: string;
    type: string;
    category: string;
    order: number;
    searchable: boolean;
    shortName: string;
    creatorUserId: string;
    representation: {
        height: number;
        width: number;
        imagePath: string;
    };
    skinVariations: never[];
};
export declare const siteEmojiWtf: {
    id: string;
    name: string;
    fallback: string;
    type: string;
    category: string;
    order: number;
    searchable: boolean;
    shortName: string;
    creatorUserId: string;
    representation: {
        height: number;
        width: number;
        imagePath: string;
    };
    skinVariations: never[];
};
export declare const expiresAt: (offsetSeconds?: number) => number;
export declare const defaultMediaApiToken: () => {
    url: string;
    clientId: string;
    jwt: string;
    collectionName: string;
    expiresAt: number;
};
export declare const standardServiceEmojis: any;
export declare const atlassianServiceEmojis: any;
export declare const siteServiceEmojis: () => {
    emojis: {
        id: string;
        shortName: string;
        name: string;
        fallback: string;
        type: string;
        category: string;
        order: number;
        representation: {
            imagePath: string;
            width: number;
            height: number;
        };
        altRepresentations: {
            XHDPI: {
                imagePath: string;
                width: number;
                height: number;
            };
        };
        searchable: boolean;
    }[];
    meta: {
        mediaApiToken: {
            url: string;
            clientId: string;
            jwt: string;
            collectionName: string;
            expiresAt: number;
        };
    };
};
export declare const filterToSearchable: (emojis: EmojiDescription[]) => EmojiDescription[];
export declare const standardEmojis: any[];
export declare const atlassianEmojis: any[];
export declare const siteEmojis: {
    name: string;
    type: string;
    category: string;
    order: number;
    representation: {
        mediaPath: string;
        width: number;
        height: number;
    };
    altRepresentation: {
        mediaPath: string;
        width: number;
        height: number;
    };
    skinVariations: never[];
    searchable: boolean;
    id: string;
    shortName: string;
    fallback: string;
}[];
export declare const emojis: any[];
export declare const searchableEmojis: EmojiDescription[];
export declare const newEmojiRepository: () => any;
export declare const newSiteEmojiRepository: () => any;
export declare const smileyEmoji: any;
export declare const openMouthEmoji: any;
export declare const grinEmoji: any;
export declare const evilburnsEmoji: any;
export declare const thumbsupEmoji: any;
export declare const thumbsdownEmoji: any;
export declare const standardBoomEmoji: any;
export declare const atlassianBoomEmoji: any;
export declare const blackFlagEmoji: any;
export declare const congoFlagEmoji: any;
export declare const getNonUploadingEmojiResourcePromise: (config?: MockEmojiResourceConfig | undefined) => Promise<any>;
export declare const getEmojiResourcePromise: (config?: MockEmojiResourceConfig | undefined) => Promise<any>;
export declare const getEmojiResourcePromiseFromRepository: (repo: EmojiRepository, config?: MockEmojiResourceConfig | undefined) => Promise<any>;
