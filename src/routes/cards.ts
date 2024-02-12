import { Router } from "express";
import { createCard, getCards, deleteCard, likeCard, dislikeCard } from "../controllers/cards";

const cardRouter = Router();

cardRouter
.post('/', createCard)
.get('/', getCards)
.delete('/:cardId', deleteCard)
.put('/:cardId/likes', likeCard)
.delete('/:cardId/likes', dislikeCard);


export default cardRouter;