import { ExtractJwt, Strategy } from "passport-jwt";
import {User} from "../../../db/index.js";

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

    // db에 유저가 존재하는지 검사
    const userExists = await User.exists({ id: userId });

    // 만약 존재하지 않으면
    if (!userExists) {
      // 없다는 것을 알림
      return done(null, false);
    }

    // 존재한다면 유저 정보를 불러와서
    const user = await User.findUserById(userId);

    // 라우터로 전달함
    return done(null, user);

  } catch (error) {
    return done(error);
  }
});

export { jwtStrategy };