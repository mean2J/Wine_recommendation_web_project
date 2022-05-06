import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { passport } from "./auths/passport/index.js";

import { userRouter } from "./routers/userRouter.js";
import { wineRouter } from "./routers/wineRouter.js";
import { bookmarkRouter } from "./routers/bookmarkRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { statRouter } from "./routers/statRouter.js";
import { searchRouter } from "./routers/searchRouter.js";
import { authRouter } from "./routers/authRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import swaggerDoc from "../api_docs/swaggerDoc.js";

// import session from "express-session";
// import MongoStore from "connect-mongo";
//
// const MONGODB_URI =
//   process.env.MONGODB_URI || "MONGODB_URI does not exist in .env file.";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: process.env.JWT_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: MONGODB_URI, collectionName: "session" }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24
//     }
//   })
// );
app.use(passport.initialize());
//app.use(passport.session());
app.use(swaggerDoc);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(statRouter);

app.use(statRouter);
app.use(userRouter);
app.use(wineRouter);
app.use(bookmarkRouter);
app.use(reviewRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(searchRouter);
app.use(authRouter);
app.use(errorMiddleware);

export { app };
