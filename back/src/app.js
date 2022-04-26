import cors from "cors";
import morgan from "morgan";
import express from "express";

import { userRouter } from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import swaggerDoc from "../api_docs/swaggerDoc.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(swaggerDoc);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(userRouter);

app.use(errorMiddleware);

export { app };