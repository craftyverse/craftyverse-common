import { Request, Response, NextFunction } from "express";
interface UserPayload {
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
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
