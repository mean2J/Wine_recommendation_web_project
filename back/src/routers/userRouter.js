import { Router } from "express";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { matchedData } from "express-validator";
import { validationErrorCatcher } from "../middlewares/errorMiddleware.js";
import { removeFields } from "../utils/utils.js";
import dayjs from "dayjs";
import { UserMiddleware } from "../middlewares/userMiddleware.js";

const userRouter = Router();

// 로컬 회원가입
userRouter.post(
  "/users/signup",
  UserMiddleware.signUpBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      // 유저를 db에 등록
      const newUser = await UserService.addUser({ ...userInfo });

      const body = {
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

// 로컬 로그인
userRouter.post(
  "/users/signin",
  UserMiddleware.signInBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const userInfo = matchedData(req);

      const user = await UserService.getUser({ ...userInfo });

      const userId = user.id;
      // 로그인 시각을 ISO full 형식으로 변환
      const date = dayjs().toISOString();
      // 최종 로그인 시각을 업데이트
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

// 유저 정보를 가져옴
userRouter.get(
  "/users/:userId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await UserService.getUserById(userId);
      const filteredUser = removeFields(user, [
        "_id",
        "email",
        "password",
        "__v",
        "createdAt",
        "updatedAt",
        "recentLogin"
      ]);

      const body = {
        success: true,
        user: filteredUser,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });

// 본인의 정보를 가져옴
userRouter.get(
  "/users",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await UserService.getUserById(userId);
      const filteredUser = removeFields(user, ["_id", "password", "__v"]);

      const body = {
        success: true,
        user: filteredUser,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });

// 본인 정보를 업데이트
userRouter.put(
  "/users",
  loginRequired,
  UserMiddleware.putBodyValidator,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const fieldToUpdate = matchedData(req);

      const user = await UserService.updateUser(userId, fieldToUpdate);
      const filteredUser = removeFields(user, ["_id", "password", "__v"]);

      const body = {
        success: true,
        user: filteredUser,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

// 회원탈퇴
userRouter.delete(
  "/users",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.user.id;

      await UserService.deleteUser(userId);

      res
        .status(200)
        .json({ success: true, message: "성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  });

export { userRouter };
