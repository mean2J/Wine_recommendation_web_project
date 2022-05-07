import { Router } from "express";
import { ReviewService } from "../services/reviewService.js";
import { WineService } from "../services/wineService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { matchedData } from "express-validator";
import { removeFields } from "../utils/utils.js";
import { validationErrorCatcher } from "../middlewares/errorMiddleware.js";
import { ReviewMiddleware } from "../middlewares/reviewMiddleware.js";

const reviewRouter = Router();

reviewRouter.post(
  "/reviews/:wineId",
  loginRequired,
  ReviewMiddleware.postBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const fieldToPost = matchedData(req);
      const { wineId } = req.params;
      const userId = req.user.id;

      // 작성자 정보를 가져옴
      const author = await UserService.getUserById(userId);

      // 와인 정보를 가져옴
      const wine = await WineService.getWineById({ id: wineId });

      // 리뷰를 db에 등록
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

      // 리뷰 정보, 작성자 정보, 와인 정보를 불러옴
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
      // 페이지네이션을 위한 변수
      const page = req.query.page || 1;
      const limit = req.query.limit || 5;

      // 전달받은 userId로 작성자 정보를 가져옴
      const author = await UserService.getUserById(userId);

      // 작성자 정보로 리뷰 목록을 가져옴
      const reviews = await ReviewService.getReviewsByAuthorId(author.id, {
        page,
        limit,
      });

      // 쓸모없는 결과값을 정리하고 작성자 닉네임을 추가
      const filteredReviews = reviews.map((review) => {
        const newReview = removeFields(review, ["_id", "updatedAt", "__v"]);
        newReview.author = { id: author.id, name: author.name };

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
  ReviewMiddleware.putBodyValidator,
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

      // 작성자 정보와 와인 정보를 가져옴
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
