import { Request, Response, NextFunction } from "express";
interface UserPayload {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
