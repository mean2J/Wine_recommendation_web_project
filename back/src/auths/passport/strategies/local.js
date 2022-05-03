import { Strategy } from "passport-local";
import { User } from "../../../db/index.js";
import bcrypt from "bcrypt";

const customFields = {
  usernameField: "email",
  passwordField: "password"
};

async function verifyCallback(username, password, done) {
  try {
    const userExists = await User.exists({ email: username });

    if (!userExists) {
      return done(null, false);
    }

    const user = await User.findUserByEmail(username);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isValid = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (isValid) {
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
}

const localStrategy = new Strategy(customFields, verifyCallback);

export { localStrategy };