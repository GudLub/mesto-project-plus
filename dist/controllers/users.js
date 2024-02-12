"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = __importDefault(require("models/user"));
const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    user_1.default.create({
        name,
        about,
        avatar
    })
        .then((user) => res.send(user))
        .catch((err) => res.status(400).send(err));
};
exports.createUser = createUser;
