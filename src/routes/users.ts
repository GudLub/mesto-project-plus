import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser } from "../controllers/users";

const userRouter = Router();

userRouter
.get('/', getUsers)
.post('/', createUser)
.patch('/me', updateUser)
.patch('/me/avatar', updateUser)
.get('/:userId', getUserById);

export default userRouter;