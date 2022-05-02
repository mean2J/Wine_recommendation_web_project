import { Router } from "express";
import { passport } from "../auths/passport/index.js";
import jwt from "jsonwebtoken";
import {body, matchedData} from "express-validator";
import {validationErrorCatcher} from "../middlewares/errorMiddleware.js";
import {UserService} from "../services/userService.js";
import dayjs from "dayjs";
import { issueJWT } from "../utils/utils.js";

const authRouter = Router();

authRouter.post(
  "/auth/local/signup",
  body("name")
    .notEmpty()
    .withMessage("이름 정보는 필수입니다.")
    .bail()
    .isString()
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
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
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
  validationErrorCatcher,
  passport.authenticate("localStrategy"),
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const user = await UserService.getUser({ ...userInfo });

      const userId = user.id;
      const date = dayjs().toISOString();
      const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

      await UserService.updateUser(userId, fieldToUpdate);

      const body = {
        success: true,
        user,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/jwt/signup",
  body("name")
    .notEmpty()
    .withMessage("이름 정보는 필수입니다.")
    .bail()
    .isString()
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const newUser = await UserService.addUser({ ...userInfo });
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
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const user = await UserService.getUser({ ...userInfo });

      const userId = user.id;
      const date = dayjs().toISOString();
      const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

      await UserService.updateUser(userId, fieldToUpdate);

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

authRouter.get("/auth/local/signout",
  async (req, res, next) => {
    req.logout();

    const body = {
      success: true,
      message: "성공적으로 로그아웃되었습니다.",
    };

    res.status(200).json(body);
});

authRouter.get(
  "/auth/google/signin",
  passport.authenticate("googleStrategy", { scope: ["profile", "email"] })
);

authRouter.get("/auth/google/signout",
  async (req, res, next) => {
    req.logout();
    req.session.destroy((error) => {
      if (error)
        next(error);

      const body = {
        success: true,
        message: "성공적으로 로그아웃되었습니다.",
      };

      res.status(200).json(body);
    });
  });

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("googleStrategy", {
    failureMessage: "구글 로그인에 실패했습니다."
  }),
  async (req, res, next) => {
    const user = req.user;

    const date = dayjs().toISOString();
    const fieldToUpdate = { recentLogin: date, updateTimestamp: false };

    await UserService.updateUser(user.id, fieldToUpdate);

    const body = {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };

    res.status(201).json(body);
  }
);

authRouter.get("/auth/protected",
  passport.authenticate("jwtStrategy", { session: false }),
  async (req, res, next) => {

    const body = {
      success: true,
      message: "yes you are authorized"
    };

    res.status(200).json(body);
  });

export { authRouter };