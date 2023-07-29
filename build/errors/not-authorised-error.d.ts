import { CustomError } from './custom-error';
export declare class NotAuthorisedError extends CustomError {
    statusCode: number;
    constructor();
    serialiseErrors(): {
        message: string;
        field: string | number;
    }[];
}
