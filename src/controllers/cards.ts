import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Card from '../models/card';
import { constants } from "http2";
import { VALIDATION_ERROR_MESSAGE, CARD_NOT_FOUND_MESSAGE, INVALID_DATA_MESSAGE, CARD_DELITION_SUCCESS_MESSAGE } from "../utils/consts"

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
try {
  const { name, link } = req.body;
  const owner = (req as any).user._id;
  const newCard = await Card.create({ name, link, owner });
  return res.status(constants.HTTP_STATUS_CREATED).send(newCard);
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
  }
  return next(error);
}
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = Card.find({});
    return res.status(constants.HTTP_STATUS_OK).send(cards);
  } catch (error) {
    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.cardId;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
    }

    const userId = (req as any).user._id;

    if (!userId || card.owner.toString() !== userId) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }

    await Card.deleteOne({_id: id});

    return res.status(constants.HTTP_STATUS_OK).send({ message: CARD_DELITION_SUCCESS_MESSAGE });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!likeCard) {
    return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
  }
    return res.status(constants.HTTP_STATUS_OK).send(likeCard);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: (req as any).user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!dislikeCard) {
    return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
  }
    return res.status(constants.HTTP_STATUS_OK).send(dislikeCard);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
};
