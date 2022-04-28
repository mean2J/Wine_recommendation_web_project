import { Router } from "express";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { body, matchedData } from "express-validator";
import { validationErrorCatcher } from "../middlewares/userMiddleware.js";
import { removeFields } from "../utils/utils.js";

const userRouter = Router();

userRouter.post(
  "/users/signup",
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
  }
);

userRouter.post(
  "/users/signin",
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

userRouter.get("/users/:userId", loginRequired, async (req, res, next) => {
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

userRouter.get("/users", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

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
  body("name").exists({ checkNull: true }).isString().trim(),
  body("password").exists({ checkNull: true }).isString(),
  body("description").exists({ checkNull: true }).isString(),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
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

userRouter.delete("/users", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    await UserService.deleteUser(userId);

    res
      .status(200)
      .json({ success: true, message: "성공적으로 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
