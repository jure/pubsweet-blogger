export declare class HttpError implements Error {
    name: string;
    message: string;
    statusCode: number;
    stack?: string;
    constructor(statusCode: number, statusMessage: string);
}
