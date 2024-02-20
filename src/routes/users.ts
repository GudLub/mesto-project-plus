import { Router } from "express";
import { getUsers, getUserById, updateUser, getAuthUser } from "../controllers/users";
import { getUserByIdValidator, updateUserAvatarValidator, updateUserInfoValidator } from "../utils/validation";

const userRouter = Router();

userRouter
.get('/', getUsers)
.get('/me', getAuthUser)
.patch('/me', updateUserInfoValidator, updateUser)
.patch('/me/avatar', updateUserAvatarValidator, updateUser)
.get('/:userId', getUserByIdValidator, getUserById);

export default userRouter;