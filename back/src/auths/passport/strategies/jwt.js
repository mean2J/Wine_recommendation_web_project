import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../../services/userService.js";
import {User} from "../../../db/index.js";
import bcrypt from "bcrypt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  jsonWebTokenOptions: {
    maxAge: "1d"
  }
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const userId = payload.id;

    const userExists = await User.exists({ id: userId });

    if (!userExists) {
      return done(null, false);
    }

    const user = await User.findUserById(userId);
    return done(null, user);

  } catch (error) {
    return done(error);
  }
});

export { jwtStrategy };