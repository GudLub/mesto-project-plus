import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import auth from "./middleware/auth";
import authRouter from "./routes/auth";
import { handleErrors } from "./middleware/handleErrors";
import helmet from "helmet";
import { requestLogger, errorLogger } from "./middleware/logger";
import { errors } from "celebrate";


const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());

app.use(requestLogger);
app.use(authRouter);
app.use(auth);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("Подключились к базе данных");
    await app.listen(PORT);
    console.log("Сервер запущен на порту:", PORT);
  } catch (err) {
    console.log(err);
  }
};

connect();
