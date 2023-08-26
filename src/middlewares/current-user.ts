import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    console.log("This is the payload: ", payload);
    req.currentUser = payload;
    console.log("This is the currentuser: ", req.currentUser);
  } catch (err) {}

  next();
};
