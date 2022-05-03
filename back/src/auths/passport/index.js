import passport from "passport";
import { jwtStrategy } from "./strategies/jwt.js";
import { localStrategy } from "./strategies/local.js";
import {googleStrategy} from "./strategies/google.js";
import {User} from "../../db/index.js";

passport.use("localStrategy", localStrategy);
passport.use("jwtStrategy", jwtStrategy);
passport.use("googleStrategy", googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findUserById(userId);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export { passport };