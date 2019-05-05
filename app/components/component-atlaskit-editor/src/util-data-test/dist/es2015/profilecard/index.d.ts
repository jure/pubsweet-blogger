import getMockProfileClient from './mock-profile-client';
declare const _default: {
    getMockProfileClient: typeof getMockProfileClient;
    profiles: ({
        User: {
            avatarUrl: any;
            fullName: string;
            nickname: string;
            email: string;
            location: string;
            meta: string;
            remoteTimeString: string;
            remoteWeekdayIndex: number;
            remoteWeekdayString: string;
        };
        Presence: {
            state: string;
        };
    } | {
        User: {
            avatarUrl: any;
            fullName: string;
            nickname: string;
            email: string;
            meta: string;
            location?: undefined;
            remoteTimeString?: undefined;
            remoteWeekdayIndex?: undefined;
            remoteWeekdayString?: undefined;
        };
        Presence: {
            state: string;
        };
    })[];
};
export default _default;
