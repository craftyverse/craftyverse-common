import { Request, Response, NextFunction } from "express";
declare const verifyRoles: (...allowedRoles: number[]) => (req: Request, res: Response, next: NextFunction) => void;
export { verifyRoles };
