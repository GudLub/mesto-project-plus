import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import { constants } from "http2";
import {
  VALIDATION_ERROR_MESSAGE,
  USERID_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USERS_NOT_FOUND_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  USER_EXISTS_MESSAGE,
} from "../utils/consts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  NotFoundError,
  AuthError,
  BadRequestError,
  ConflictingRequestError,
} from "../utils/errors";

export const jwtSecret = process.env.JWT_SECRET as string;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, about, avatar, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    const { password, ...rest } = newUser.toObject();
    return res
    .status(constants.HTTP_STATUS_CREATED)
    .send(rest);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
    }
    if (error.code === 11000) {
      return next(new ConflictingRequestError(USER_EXISTS_MESSAGE));
    }
    return next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({})
    .orFail(() => {
      throw new NotFoundError(USERS_NOT_FOUND_MESSAGE);
    });
    return res
    .status(constants.HTTP_STATUS_OK)
    .send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError(USERID_NOT_FOUND_MESSAGE);
    });
    return res.
    status(constants.HTTP_STATUS_OK)
    .send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(INVALID_DATA_MESSAGE));
    }
    return next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate((req as any).user._id, req.body, {
      new: true,
      runValidators: true,
    }).orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    });
    return res
    .status(constants.HTTP_STATUS_OK)
    .send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
    }
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .orFail(() => {
        throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AuthError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });

    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "strict",
      })
      .send({ token });
  } catch (error) {
    return next(error);
  }
};

export const getAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = (req as any).user._id;
    const user = await User.findById(id)
    .orFail(() => {
      throw new NotFoundError(USERID_NOT_FOUND_MESSAGE);
    });
    return res
    .status(constants.HTTP_STATUS_OK)
    .send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(INVALID_DATA_MESSAGE));
    }
    return next(error);
  }
};
