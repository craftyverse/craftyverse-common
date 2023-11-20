import { CustomError } from "./custom-error";
export declare class ConfictError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serialiseErrors(): {
        message: string;
        field: string | number;
    }[];
}
