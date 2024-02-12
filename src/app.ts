import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./routes/index";

import { handleErrors } from "./middleware/handleErrors";

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req: Request | any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65c3a21f563d74d309df65be'
  }
  next();
});

app.use(router);
app.use(handleErrors);

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");
    console.log("Подключились к базе данных");
    await app.listen(PORT);
    console.log("Сервер запущен на порту:", PORT);
  } catch (err) {
    console.log(err);
  }
};

connect();
