import { Review, User, Wine } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import { ReviewModel } from "../db/schemas/review.js";

class ReviewService {
  static async addReview(review) {
    // id 부여
    const id = uuidv4();
    const newReview = { id, ...review };

    const createdReview = await Review.createReview(newReview);

    return createdReview;
  }

  static async getReviewById(id) {
    // db에 있는지 체크
    const itExists = await Review.exists({ id: id });

    if (!itExists) {
      const error = new Error("리뷰가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    const review = await Review.findReviewById(id);

    return review;
  }

  static async getReviewsByAuthorId(authorId, query) {
    // db에 작성자가 있는지 체크
    const authorExists = await User.exists({ id: authorId });

    if (!authorExists) {
      const error = new Error("존재하지 않는 유저입니다.");
      error.status = 404;
      throw error;
    }

    const reviews = await Review.findReviewByAuthorId(authorId, query);

    return reviews;
  }

  static async getReviewsByWineId(wineId) {
    // db에 와인이 있는지 체크
    const wineExists = await Wine.exists({ id: wineId });

    if (!wineExists) {
      const error = new Error("존재하지 않는 와인입니다.");
      error.status = 404;
      throw error;
    }

    const reviews = await Review.findReviewByWineId(wineId);

    return reviews;
  }

  static async getAverageRatingByWineId(wineId) {
    const ratings = await Review.getRatings(wineId);
    const ratingCnt = ratings.length;
    let rating =
      ratings.reduce((res, { rating }) => {
        return (res += rating);
      }, 0) / ratings.length;

    if (!rating) {
      rating = 0;
    }
    return { ratingCnt, rating };
  }

  static async updateReview(id, fieldToUpdate) {
    // db에 있는지 체크
    const itExists = await Review.exists({ id: id });

    if (!itExists) {
      const error = new Error("리뷰가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    const updatedReview = await Review.updateReview(id, fieldToUpdate);

    return updatedReview;
  }

  static async deleteReview(id) {
    // db에 있는지 체크
    const itExists = await Review.exists({ id: id });

    if (!itExists) {
      const error = new Error("리뷰가 존재하지 않습니다.");
      error.status = 404;
      throw error;
    }

    await Review.deleteReview(id);
  }
}

export { ReviewService };
