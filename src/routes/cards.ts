import { Router } from "express";
import { createCard, getCards, deleteCard, likeCard, dislikeCard } from "../controllers/cards";
import { createCardValidator, CardValidator } from "../utils/validation";

const cardRouter = Router();

cardRouter
.post('/', createCardValidator, createCard)
.get('/', getCards)
.delete('/:cardId', CardValidator, deleteCard)
.put('/:cardId/likes', CardValidator, likeCard)
.delete('/:cardId/likes', CardValidator, dislikeCard);


export default cardRouter;