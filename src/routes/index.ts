import { Router, Request, Response } from "express";
import userRouter from "./users";
import cardRouter from "./cards";
import { constants } from "http2";
import {INVALID_ROUTE_MESSAGE } from "../utils/consts"

const router = Router();


router
.use('/users', userRouter)
.use('/cards', cardRouter)
.use('*', (req: Request, res: Response) => {
    return res.status(constants.HTTP_STATUS_NOT_FOUND).send(INVALID_ROUTE_MESSAGE);
  });

export default router;