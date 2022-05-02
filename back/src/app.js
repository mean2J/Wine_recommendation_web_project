import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from "cors";
import morgan from "morgan";
import express from "express";

import { userRouter } from "./routers/userRouter.js";
import { wineRouter } from "./routers/wineRouter.js";
import { bookmarkRouter } from "./routers/bookmarkRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { statRouter } from "./routers/statRouter.js";
import { searchRouter } from "./routers/searchRouter.js";
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

app.use(statRouter);
app.use(userRouter);
app.use(wineRouter);
app.use(bookmarkRouter);
app.use(reviewRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(searchRouter);
app.use(errorMiddleware);

export { app };
