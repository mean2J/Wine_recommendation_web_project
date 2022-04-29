import mongoose from "mongoose";
<<<<<<< HEAD
// import { User } from "./models/User.js";
import { Wine } from "./models/Wine.js";
=======
import { User } from "./models/user.js";
import { Wine } from "./models/wine.js";
import { Bookmark } from "./models/bookmark.js";
>>>>>>> 271d2337b2c9c7058a17f176374c448478370a2a
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

<<<<<<< HEAD
// export { User, Wine };
export { Wine };
=======
export { User, Wine, Bookmark };
>>>>>>> 271d2337b2c9c7058a17f176374c448478370a2a
