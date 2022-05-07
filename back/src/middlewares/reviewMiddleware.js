import { body } from "express-validator";

const ReviewMiddleware = {};

ReviewMiddleware.postBodyValidator = [
  body("title")
    .notEmpty()
    .withMessage("제목은 필수입니다.")
    .bail()
    .isString()
    .trim(),
  body("content")
    .notEmpty()
    .withMessage("본문 내용은 필수입니다.")
    .bail()
    .isString(),
  body("rating")
    .notEmpty()
    .withMessage("별점 정보가 없습니다.")
    .bail()
    .isInt({ min: 0, max: 5})
];

ReviewMiddleware.putBodyValidator = [
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
];

export { ReviewMiddleware };
