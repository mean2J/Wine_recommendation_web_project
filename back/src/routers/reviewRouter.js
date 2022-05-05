import { Router } from "express";
import { ReviewService } from "../services/reviewService.js";
import { WineService } from "../services/wineService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { body, matchedData } from "express-validator";
import { removeFields } from "../utils/utils.js";
import { validationErrorCatcher } from "../middlewares/errorMiddleware.js";

const reviewRouter = Router();

reviewRouter.post(
  "/reviews/:wineId",
  loginRequired,
  body("title")
    .notEmpty()
    .withMessage("제목은 필수입니다.")
    .bail()
    .isString()
    .trim(),
  body("content").notEmpty().withMessage("본문 내용은 필수입니다.").bail(),
  body("rating").notEmpty().withMessage("별점 정보가 없습니다.").bail(),
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const fieldToPost = matchedData(req);
      const { wineId } = req.params;
      const userId = req.user.id;

      const author = await UserService.getUserById(userId);
      const wine = await WineService.getWineById({ id: wineId });

      const review = await ReviewService.addReview({
        ...fieldToPost,
        author: userId,
        wine: wineId,
      });

      // response로 돌려줄 값만 담음
      const authorBody = { id: author.id, name: author.name };
      const wineBody = { id: wine.id, name: wine.name };
      const reviewBody = {
        id: review.id,
        title: review.title,
        content: review.content,
        author: authorBody,
        wine: wineBody,
        rating: review.rating,
        createdAt: review.createdAt,
      };

      const body = {
        success: true,
        review: reviewBody,
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

      const author = await UserService.getUserById(review.author);
      const wine = await WineService.getWineById({ id: review.wine });

      // response로 돌려줄 값만 담음
      const authorBody = { id: author.id, name: author.name };
      const wineBody = { id: wine.id, name: wine.name };

      const filteredReview = removeFields(review, ["_id", "updatedAt", "__v"]);

      const reviewBody = {
        ...filteredReview,
        author: authorBody,
        wine: wineBody,
      };

      const body = {
        success: true,
        review: reviewBody,
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
      const page = req.query.page || 1;
      const limit = req.query.limit || 5;

      // 전달받은 userId로 작성자 정보를 가져옴
      const author = await UserService.getUserById(userId);

      // 작성자 정보로 리뷰 목록을 가져옴
      const reviews = await ReviewService.getReviewsByAuthorId(author.id, {page, limit});

      const filteredReviews =
        reviews.map((review) => {
          const newReview = removeFields(review, ["_id", "updatedAt", "__v"]);
          newReview.author = { id: author.id, name: author.name }

          return newReview;
        });


      const body = {
        success: true,
        reviews: filteredReviews,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

reviewRouter.get(
  "/reviews/wines/:wineId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { wineId } = req.params;

      // 전달받은 wineId로 리뷰 목록을 가져옴
      const reviews = await ReviewService.getReviewsByWineId(wineId);

      const filteredReviews = reviews.map((review) => {
        return removeFields(review, ["_id", "updatedAt", "__v"]);
      });

      const body = {
        success: true,
        reviews: filteredReviews,
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
  body("title")
    .exists({ checkNull: true })
    .isString()
    .trim(),
  body("content")
    .exists({ checkNull: true })
    .isString(),
  body("rating")
    .exists({ checkNull: true })
    .isInt({ min: 0, max: 5 }),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { reviewId } = req.params;
      const fieldToUpdate = matchedData(req);

      const review = await ReviewService.getReviewById(reviewId);

      // 현재 로그인한 유저와 작성자가 다르다면
      if (review.author !== userId) {
        // 에러를 throw
        const error = new Error("수정 권한이 없습니다.");
        error.status = 401;
        throw error;
      }

      const updatedReview = await ReviewService.updateReview(
        reviewId,
        fieldToUpdate
      );

      const filteredReview = removeFields(updatedReview, [
        "_id",
        "updatedAt",
        "__v",
      ]);

      const author = await UserService.getUserById(review.author);
      const wine = await WineService.getWineById({ id: review.wine });

      // response로 돌려줄 값만 담음
      const authorBody = { id: author.id, name: author.name };
      const wineBody = { id: wine.id, name: wine.name };

      const reviewBody = {
        ...filteredReview,
        author: authorBody,
        wine: wineBody,
      };

      const body = {
        success: true,
        review: reviewBody,
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
      const userId = req.user.id;
      const { reviewId } = req.params;

      const review = await ReviewService.getReviewById(reviewId);

      // 현재 로그인한 유저와 작성자가 다르다면
      if (review.author !== userId) {
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

//와인 별점 정보 전송 rating, ratingCnt
reviewRouter.get("/reviews/rating/:wineId", async (req, res, next) => {
  try {
    const { wineId } = req.params;

    const { ratingCnt, rating } = await ReviewService.getAverageRatingByWineId(
      wineId
    );

    const body = {
      success: true,
      rating: Number(rating.toFixed(1)),
      ratingCnt,
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
