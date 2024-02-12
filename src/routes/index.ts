import { Router } from "express";
import userRouter from "./users";
import cardRouter from "./cards";

const router = Router();

router
.use('/users', userRouter)
.use('/cards', cardRouter);

export default router;