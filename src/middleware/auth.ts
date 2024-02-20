import { NextFunction, Request, Response } from "express";
import { AuthError } from "../utils/errors";
import {
  INVALID_JWT_MESSAGE,
  AUTHORIZATION_NEEDED_MESSAGE,
} from "../utils/consts";
import { jwtSecret } from "../controllers/users";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AuthError(INVALID_JWT_MESSAGE);
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, jwtSecret);
    (req as any).user = payload;
    return next();
  } catch (error) {
    return next(new AuthError(AUTHORIZATION_NEEDED_MESSAGE));
  }
};
