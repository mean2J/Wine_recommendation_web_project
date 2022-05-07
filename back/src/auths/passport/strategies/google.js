import { Strategy } from "passport-google-oauth20";
import { User } from "../../../db/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const GOOGLE_CALLBACK_URL = "http://localhost:5001/auth/google/callback";

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
};

async function googleVerifyFunction(req, accessToken, refreshToken, profile, done) {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    const userExists = await User.exists({ email: email });

    if (!userExists) {
      const hashedPassword = await bcrypt.hash(process.env.JWT_SECRET_KEY, 10);

      const id = uuidv4();

      const createdNewUser = await User.createUser({
        id: id,
        name: name,
        email: email,
        password: hashedPassword
      });

      return done(null, createdNewUser);
    }

    const user = await User.findUserByEmail(email);
    return done(null, user);

  } catch (error) {
    return done(error);
  }
}

const googleStrategy = new Strategy(options, googleVerifyFunction);

export { googleStrategy };