import { AbstractResource } from '@atlaskit/util-service-support';
import { EmojiDescription, EmojiId, EmojiSearchResult, EmojiUpload, OptionalEmojiDescription, SearchOptions, ToneSelection, User, OptionalUser, EmojiProvider, UploadingEmojiProvider, EmojiRepository, CategoryId } from '@atlaskit/emoji';
import { PromiseBuilder, UploadDetail } from './utils';
export interface MockEmojiResourceConfig {
    promiseBuilder?: PromiseBuilder<any>;
    uploadSupported?: boolean;
    uploadError?: string;
    optimisticRendering?: boolean;
    currentUser?: User;
}
export declare class MockNonUploadingEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
    protected emojiRepository: EmojiRepository;
    protected promiseBuilder: PromiseBuilder<any>;
    protected lastQuery: string;
    protected selectedTone: ToneSelection;
    protected optimisticRendering?: boolean;
    protected currentUser?: User;
    recordedSelections: EmojiDescription[];
    constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig);
    getCurrentUser(): OptionalUser;
    filter(query?: string, options?: SearchOptions): void;
    findByShortName(shortName: string): Promise<OptionalEmojiDescription>;
    findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> | OptionalEmojiDescription;
    findById(id: string): Promise<OptionalEmojiDescription>;
    findInCategory(categoryId: CategoryId): Promise<EmojiDescription[]>;
    getAsciiMap(): Promise<Map<string, EmojiDescription>>;
    getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]>;
    recordSelection?(emoji: EmojiDescription): Promise<any>;
    deleteSiteEmoji(emoji: EmojiDescription): Promise<boolean>;
    loadMediaEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticMediaRendering(emoji: EmojiDescription): boolean;
    getSelectedTone(): ToneSelection;
    setSelectedTone(tone: ToneSelection): void;
    calculateDynamicCategories(): Promise<string[]>;
}
export declare class MockEmojiResource extends MockNonUploadingEmojiResource implements UploadingEmojiProvider {
    private uploads;
    private uploadSupported;
    private uploadError?;
    constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig);
    isUploadSupported(): Promise<boolean>;
    uploadCustomEmoji(upload: EmojiUpload): Promise<any>;
    getUploads(): UploadDetail[];
    prepareForUpload(): Promise<void>;
    notifyNotReady(): void;
    loadMediaEmoji(emoji: EmojiDescription): EmojiDescription | Promise<any>;
}
/**
 * An EmojiResource used in storybooks to allow a user a mechanism for clearing their frequently used emoji.
 */
export declare class UsageClearEmojiResource extends MockNonUploadingEmojiResource {
    constructor(emojis: EmojiDescription[]);
    clearFrequentlyUsed(): void;
}
export declare const mockNonUploadingEmojiResourceFactory: (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig | undefined, promiseBuilder?: PromiseBuilder<any> | undefined) => Promise<any>;
export declare const mockEmojiResourceFactory: (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig | undefined, promiseBuilder?: PromiseBuilder<any> | undefined) => Promise<any>;
