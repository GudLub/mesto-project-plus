"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CardSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    likes: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
exports.default = mongoose_1.default.model('card', CardSchema);
