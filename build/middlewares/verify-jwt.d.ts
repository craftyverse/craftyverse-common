import { Request, Response, NextFunction } from "express";
import "dotenv/config";
declare global {
    namespace Express {
        interface Request {
            userId: string;
            userFirstName: string;
            userLastName: string;
            userEmail: string;
            userRoles: number[];
        }
    }
}
declare const verifyJWT: (req: Request, res: Response, next: NextFunction) => void;
export { verifyJWT };
