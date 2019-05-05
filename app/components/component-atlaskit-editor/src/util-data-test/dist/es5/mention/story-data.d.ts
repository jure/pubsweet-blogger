import { MockMentionResource as MentionResource } from './MockMentionResource';
import { MockMentionResourceWithInfoHints as MentionResourceWithInfoHints } from './MockMentionResourceWithInfoHints';
export declare const sampleAvatarUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIACAAIAMBIgACEQEDEQH/xAB1AAEAAwEAAAAAAAAAAAAAAAAHAgUGCBAAAQMCBQMDAgcAAAAAAAAAAQIDBAURAAYSIUEHEzEUImEVcSMyQlGBweEBAAMBAAAAAAAAAAAAAAAAAAMEBwURAAICAgMBAQEAAAAAAAAAAAECAxEABBIhIkExgf/aAAwDAQACEQMRAD8AxWVci1ipwmJdT7seKFbIMgLKrGxTYkkH4NsMH1D0UFwsqsAACom1zbxvje9QMoU6BVnnFPswkqBX71JQkj7nnBFmwNx6JJmw5zUtkKUlCmFhaCAkG+21/IxCZ2keQ2KA6/uWzyF5X2cs1T1To62n3jYoWUuDfyLf3gUzhl/MuUI06fDLjdMBGh5EtCyQogBOm2q9+L+MJ1Ep0p1SFd5lptwqSe6sJCRpBvvySQP4xoqZlFt6QluQ4iSUL1eQQP8AcG1pHieqsHFHcVyv8xB6l0hnNOUrzGPUKlsBBXYa0FJ/MkkEbEA253GB/I/SeH0wy1PocFtoU6pOeqbbUjthp3TY8nyPngbADHT1ejCi02LGaShx6GlJKFH2rPlV/ub4H85yI+bSqPGdRSZjThdbYeSUNlRFlAnwQfixGNTZn4zSRq3hjdYprRK0cbyD2ABeBHULpiOo8ymrluBNMpai4lgoU5+MFg6zpULWtbkEXww5Ey/EpFOhoYQtllsDVqPudI5V9/OI0ZNMyahuI4tqsy/euykak90nlXgC9hsNv3xd0xuTMImylLaSE3S3+kE8cYHJslwsQbyvzADXRHaSuz9z/9k=";
export declare const mentions: ({
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    lozenge: string;
    accessLevel: string;
    presence: {
        status: string;
        time: string;
    };
    nickname?: undefined;
} | {
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    lozenge: string;
    accessLevel: string;
    presence: {
        status: string;
        time?: undefined;
    };
    nickname?: undefined;
} | {
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    presence: {
        status: string;
        time: string;
    };
    lozenge?: undefined;
    accessLevel?: undefined;
    nickname?: undefined;
} | {
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    nickname: string;
    lozenge: string;
    accessLevel: string;
    presence: {
        status: string;
        time?: undefined;
    };
} | {
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    nickname: string;
    accessLevel: string;
    presence: {
        status: string;
        time?: undefined;
    };
    lozenge?: undefined;
} | {
    id: string;
    avatarUrl: string;
    name: string;
    mentionName: string;
    nickname: string;
    lozenge?: undefined;
    accessLevel?: undefined;
    presence?: undefined;
} | {
    id: string;
    name: string;
    mentionName: string;
    presence: {
        time: string;
        status?: undefined;
    };
    avatarUrl?: undefined;
    lozenge?: undefined;
    accessLevel?: undefined;
    nickname?: undefined;
} | {
    id: string;
    avatarUrl: string;
    name: string;
    lozenge: string;
    mentionName: string;
    accessLevel?: undefined;
    presence?: undefined;
    nickname?: undefined;
})[];
export declare const slowResourceProvider: MentionResource;
export declare const resourceProvider: MentionResource;
export declare const resourceProviderWithInfoHints: MentionResourceWithInfoHints;
