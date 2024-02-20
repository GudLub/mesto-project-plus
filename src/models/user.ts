import { Schema, model } from "mongoose";
import {
  DEFAULT_ABOUT_VALUE,
  DEFAULT_AVATAR_LINK,
  DEFAULT_USER_NAME,
} from "../utils/consts";
import validator from "validator";
interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
      default: DEFAULT_USER_NAME,
    },
    about: {
      type: String,
      minlength: [2, "Минимальная длина 2 символа"],
      maxlength: [200, "Максимальная длина 200 символов"],
      default: DEFAULT_ABOUT_VALUE,
    },
    avatar: {
      type: String,
      validate: (v: string) => validator.isURL(v),
      default: DEFAULT_AVATAR_LINK,
    },
    email: {
      type: String,
      required: [true, "Поле email обязательно"],
      validate: (v: string) => validator.isEmail(v),
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Поле password обязательно"],
      select: false,
    },
  },
  { versionKey: false }
);

export default model<IUser>("user", UserSchema);
