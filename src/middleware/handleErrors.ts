import { ErrorRequestHandler } from "express";

export const handleErrors: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};
