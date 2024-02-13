import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import { constants } from "http2";
import { VALIDATION_ERROR_MESSAGE, STATUS_NOT_FOUND, INVALID_DATA_MESSAGE, USER_NOT_FOUND_MESSAGE, USERS_NOT_FOUND_MESSAGE } from "../utils/consts";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
try {
  const { name, about, avatar } = req.body;
  const newUser = await User.create({ name, about, avatar });
  return res.status(constants.HTTP_STATUS_CREATED).send(newUser);
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
  }
  return next(error);
}
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: USERS_NOT_FOUND_MESSAGE });
    }
    return res.status(constants.HTTP_STATUS_OK).send(users);
  } catch (error) {
    return next(error);
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: STATUS_NOT_FOUND });
    }
    return res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate((req as any).user._id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!user) {
    return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });
  }
return res.status(constants.HTTP_STATUS_OK).send(user);
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
  }
  return next(error);
}
};

