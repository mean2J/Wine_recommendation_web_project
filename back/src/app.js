import cors from "cors";
import morgan from "morgan";
import express from "express";

import { userRouter } from "./routers/userRouter.js";
import { wineRouter } from "./routers/wineRouter.js";
import { bookmarkRouter } from "./routers/bookmarkRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(userRouter);
app.use(wineRouter);
app.use(bookmarkRouter);
app.use(errorMiddleware);

export { app };
