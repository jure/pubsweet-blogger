import { EmojiUpload, EmojiDescription } from '@atlaskit/emoji';
export interface PromiseBuilder<R> {
    (result: R, context: string): Promise<R>;
}
export interface UploadDetail {
    upload: EmojiUpload;
    emoji: EmojiDescription;
}
export declare const customType = "SITE";
export declare const customCategory = "CUSTOM";
export declare const selectedToneStorageKey = "fabric.emoji.selectedTone";
