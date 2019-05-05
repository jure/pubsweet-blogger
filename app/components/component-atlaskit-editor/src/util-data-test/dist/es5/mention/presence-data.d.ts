export interface PresenceValidInfo {
    data: Data;
}
export interface Data {
    PresenceBulk: PresenceBulk[];
}
export interface PresenceBulk {
    userId: string;
    state: null | string;
    type: null | string;
    date: null | string;
    message: null | string;
    stateMetadata?: string;
}
export declare const validPresenceData: PresenceValidInfo;
export declare const invalidPresenceData: PresenceValidInfo;
