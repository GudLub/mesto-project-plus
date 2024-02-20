import { Router } from "express";
import { login, createUser } from "../controllers/users";
import { loginValidator, createUserValidator } from "../utils/validation";

const authRouter = Router();

authRouter
.post("/signin", loginValidator, login)
.post("/signup", createUserValidator, createUser);

export default authRouter;
