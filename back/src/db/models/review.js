import { ReviewModel } from "../schemas/review.js";

class Review {
  static async createReview(Review) {
    const newReview = await ReviewModel.create(Review);
    return newReview;
  }

  static async findReviewById(id) {
    const review = await ReviewModel
      .findOne({ id: id })
      .lean();
    return review;
  }

  static async findReviewByAuthorId(authorId) {
    const reviews = await ReviewModel
      .find({ author: authorId })
      .lean();
    return reviews;
  }

  static async findReviewByTitle(title) {
    const reviews = await ReviewModel.find({ title: title }).lean();
    return reviews;
  }

  static async findReviewByWine(wine) {
    const reviews = await ReviewModel
      .find({ wine: wine })
      .lean();
    return reviews;
  }

  static async exists(filter) {
    const itExists = await ReviewModel.exists(filter);
    return itExists;
  }

  static async updateReview(id, fieldToUpdate) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updatedReview = await ReviewModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      option
    ).lean();
    return updatedReview;
  }

  static async deleteReview(id) {
    await ReviewModel.findOneAndDelete({ id: id });
  }
}

export { Review };
