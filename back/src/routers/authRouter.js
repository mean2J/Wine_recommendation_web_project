import { Router } from "express";
import { passport } from "../auths/passport/index.js";
import { matchedData } from "express-validator";
import {validationErrorCatcher} from "../middlewares/errorMiddleware.js";
import {UserService} from "../services/userService.js";
import dayjs from "dayjs";
import { issueJWT } from "../utils/utils.js";
import axios from "axios";
import { User } from "../db/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/auth/local/signup",
  AuthMiddleware.signUpBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);
      const newUser = await UserService.addUser({ ...userInfo });

      const body = {
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  });

authRouter.post(
  "/auth/local/signin",
  AuthMiddleware.signInBodyValidator,
  validationErrorCatcher,
  passport.authenticate("localStrategy", { session: false }),
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const user = await UserService.getUser({ ...userInfo });

      const userId = user.id;

      // 현재 시각을 ISO full 양식으로 변경
      const date = dayjs().toISOString();

      // 최근 로그인 일자를 갱신하되 유저 정보 수정 시각은 변경하지 않음
      const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

      await UserService.updateUser(userId, fieldToUpdate);

      // jwt 생성
      const jwt = issueJWT(user);

      const body = {
        success: true,
        user: {
          ...user,
          token: jwt.token,
          expiresIn: jwt.expires
        },
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/jwt/signup",
  AuthMiddleware.signUpBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const newUser = await UserService.addUser({ ...userInfo });

      // jwt 생성
      const jwt = issueJWT(newUser);

      const body = {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          token: jwt.token,
          expiresIn: jwt.expires
        },
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  });

authRouter.post(
  "/auth/jwt/signin",
  AuthMiddleware.signInBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const user = await UserService.getUser({ ...userInfo });

      const userId = user.id;

      // 현재 시각을 ISO full 양식으로 변경
      const date = dayjs().toISOString();

      // 최근 로그인 일자를 갱신하되 유저 정보 수정 시각은 변경하지 않음
      const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

      await UserService.updateUser(userId, fieldToUpdate);

      // jwt 생성
      const jwt = issueJWT(user);

      const body = {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: jwt.token,
          expiresIn: jwt.expires
        },
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

// authRouter.get("/auth/local/signout",
//   async (req, res, next) => {
//     req.logout();
//
//     const body = {
//       success: true,
//       message: "성공적으로 로그아웃되었습니다.",
//     };
//
//     res.status(200).json(body);
// });

authRouter.post(
  "/auth/google/signin",
  async (req, res, next) => {
    try {
      const { token } = req.body;

      // 토큰을 구글에 전송해서 확인
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);

      const { email, name } = response.data;

      // db에 해당 유저가 존재하는지 확인
      const userExists = await User.exists({ email: email });

      // 존재하지 않는다면
      if (!userExists) {
        // 패스워드를 채우고
        const hashedPassword = await bcrypt.hash(process.env.JWT_SECRET_KEY, 10);
        // id를 부여해서
        const id = uuidv4();
        // db에 등록
        const createdNewUser = await User.createUser({
          id: id,
          name: name,
          email: email,
          password: hashedPassword
        });

        // jwt 발행
        const jwt = issueJWT(createdNewUser);

        const body = {
          success: true,
          user: {
            id: createdNewUser.id,
            name: createdNewUser.name,
            email: createdNewUser.password,
            token: jwt.token,
            expiresIn: jwt.expires
          }
        };

        res.status(200).json(body);
      }
      // 존재한다면
      else {
        // 유저 정보를 db에서 받아옴
        const user = await UserService.getUserByEmail(email);
        // 토큰 발행
        const jwt = issueJWT(user);
        // 최근 로그인 일자를 갱신
        const date = dayjs().toISOString();
        const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

        await UserService.updateUser(user.id, fieldToUpdate);

        const body = {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.password,
            token: jwt.token,
            expiresIn: jwt.expires
          }
        };

        res.status(200).json(body);
      }
    } catch (error) {
      next(error);
    }
  }
);
//
// authRouter.get(
//   "/auth/google/callback",
//   passport.authenticate("googleStrategy", {
//     session: false,
//     failureMessage: "구글 로그인에 실패했습니다."
//   }),
//   async (req, res, next) => {
//     const user = req.user;
//
//     const date = dayjs().toISOString();
//     const fieldToUpdate = { recentLogin: date, updateTimestamp: false };
//
//     await UserService.updateUser(user.id, fieldToUpdate);
//
//     const jwt = issueJWT(user);
//
//     const body = {
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         token: jwt.token,
//         expiresIn: jwt.expires
//       },
//     };
//
//     res.status(201).json(body);
//   }
// );

export { authRouter };