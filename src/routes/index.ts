import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./users";
import cardRouter from "./cards";
import {INVALID_ROUTE_MESSAGE } from "../utils/consts";
import { NotFoundError } from "../utils/errors"

const router = Router();


router
.use('/users', userRouter)
.use('/cards', cardRouter)
.use('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError(INVALID_ROUTE_MESSAGE));
  });

export default router;