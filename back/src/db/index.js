import mongoose from "mongoose";
<<<<<<< HEAD
import {User} from "./models/User.js";
=======
import { User } from "./models/User.js";
import { Wine } from "./models/Wine.js";
import { Bookmark } from "./models/Bookmark.js";
>>>>>>> 44e0233864880379191b077dd69689191d466435
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

export { User, Wine, Bookmark };
