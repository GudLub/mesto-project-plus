"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("controllers/users");
const userRouter = (0, express_1.Router)();
// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUserById);
userRouter.post('/', users_1.createUser);
exports.default = userRouter;
