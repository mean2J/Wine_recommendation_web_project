import { Router } from "express";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const userRouter = Router();

userRouter.post("/users/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await UserService.addUser({
      name,
      email,
      password,
    });

    const body = {
      success: true,
      user: newUser,
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/users/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getUser({ email, password });

    const body = {
      success: true,
      user,
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/users", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { name, email, password, description } = req.body;

    const fieldToUpdate = {
      name,
      email,
      password,
      description,
    };

    const user = await UserService.updateUser(userId, fieldToUpdate);

    const body = {
      success: true,
      user,
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

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
