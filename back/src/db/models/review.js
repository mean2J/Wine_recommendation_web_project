import { ReviewModel } from "../schemas/review.js";

class Review {
  // 새로운 리뷰를 db에 등록
  static async createReview(Review) {
    const newReview = await ReviewModel.create(Review);
    return newReview;
  }

  // wine에 대한 별점 정보를 모두 가져옴
  static async getRatings(wineId) {
    const ratings = await ReviewModel
      .find(
        { wine: wineId },
        { rating: true, _id: false }
      )
      .lean();

    return ratings;
  }

  // review id 1개에 해당하는 리뷰 정보를 가져옴
  static async findReviewById(id) {
    const review = await ReviewModel
      .findOne({ id: id })
      .lean();
    return review;
  }

  // 작성자 id를 바탕으로 그 유저가 작성한 리뷰를 전부 가져옴
  static async findReviewByAuthorId(authorId, query) {
    const reviews = await ReviewModel
      .find({ author: authorId })
      .sort({createdAt: -1})
      .limit(query.limit)
      .skip((query.page - 1) * query.limit)
      .lean();
    return reviews;
  }

  // 제목을 입력받아 리뷰를 가져옴
  static async findReviewByTitle(title) {
    const reviews = await ReviewModel.find({ title: title }).lean();
    return reviews;
  }

  // wine에 대한 리뷰를 전부 가져옴
  static async findReviewByWineId(wineId) {
    const reviews = await ReviewModel
      .find({ wine: wineId })
      .lean();

    return reviews;
  }

  // 입력받은 값을 가진 데이터가 db에 존재하는지 확인
  static async exists(filter) {
    const itExists = await ReviewModel.exists(filter);
    return itExists;
  }

  // 리뷰 정보를 업데이트함
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

  // 리뷰 1개를 삭제함
  static async deleteReview(id) {
    await ReviewModel.findOneAndDelete({ id: id });
  }
}

export { Review };
