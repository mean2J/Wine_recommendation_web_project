import { Router } from "express";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { body, matchedData } from "express-validator";
import { validationErrorCatcher } from "../middlewares/errorMiddleware.js";
import { removeFields } from "../utils/utils.js";
import dayjs from "dayjs";
import { UserMiddleware } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.post(
  "/users/signup",
  UserMiddleware.signUpBodyValidator,
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
  }
);

userRouter.post(
  "/users/signin",
  UserMiddleware.signInBodyValidator,
  validationErrorCatcher,
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
