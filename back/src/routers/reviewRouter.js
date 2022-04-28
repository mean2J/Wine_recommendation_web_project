import { Router } from "express";
import { ReviewService } from "../services/reviewService.js";
import { WineService } from "../services/WineService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { body, matchedData } from "express-validator";
import { removeFields } from "../utils/utils.js";

const reviewRouter = Router();

reviewRouter.post(
  "/reviews/:wineId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { title, author, content } = req.body;
      const { wineId } = req.params;
      const wine = await WineService.getWineById({ id: wineId });

      const review = await ReviewService.addReview({ title, author, content, wine });

      const body = {
        success: true,
        review
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.get(
  "/reviews/:reviewId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      const review = await ReviewService.getReviewById(reviewId);

      const body = {
        success: true,
        review
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.get(
  "/reviews/authors/:userId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      // 전달받은 userId로 작성자 정보를 가져옴
      const author = await UserService.getUserById(userId);
      // 작성자 정보로 리뷰 목록을 가져옴
      const reviews = await ReviewService.getReviewsByAuthor(author);

      const body = {
        success: true,
        reviews
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.put(
  "/reviews/:reviewId",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { reviewId } = req.params;
      const { title, content } = req.body;

      const fieldToUpdate = {
        title, content
      };

      const review = await ReviewService.getReviewById(reviewId);

      // 현재 로그인한 유저와 작성자가 다르다면
      if (review.author.id !== userId) {
        // 에러를 throw
        const error = new Error("수정 권한이 없습니다.");
        error.status = 401;
        throw error;
      }

      const updatedReview = await ReviewService.updateReview(reviewId, fieldToUpdate);

      const body = {
        success: true,
        review: updatedReview,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.delete(
  "/reviews/:reviewId",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { reviewId } = req.params;

      const review = await ReviewService.getReviewById(reviewId);

      // 현재 로그인한 유저와 작성자가 다르다면
      if (review.author.id !== userId) {
        // 에러를 throw
        const error = new Error("삭제 권한이 없습니다.");
        error.status = 401;
        throw error;
      }

      await ReviewService.deleteReview(reviewId);

      res
        .status(200)
        .json({ success: true, message: "성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  }
);

export { reviewRouter };