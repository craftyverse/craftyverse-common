import { ZodIssue } from 'zod';
import { CustomError } from './custom-error';
export declare class RequestValidationError extends CustomError {
    errors: ZodIssue[];
    statusCode: number;
    constructor(errors: ZodIssue[]);
    serialiseErrors(): {
        message: string;
        field: string | number;
    }[];
}
