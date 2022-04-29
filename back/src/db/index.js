import mongoose from "mongoose";
// import { User } from "./models/User.js";
import { User } from "./models/user.js";
import { Wine } from "./models/wine.js";
import { Bookmark } from "./models/bookmark.js";
import { Stat } from "./models/stat.js";
import { Review } from "./models/review.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "MONGODB_URI does not exist in .env file.";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("mongodb is successfully connected");
  })
  .catch((error) => {
    console.error(error);
  });

export { User, Wine, Bookmark, Review, Stat };
