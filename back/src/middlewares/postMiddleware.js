import { body } from "express-validator";

const PostMiddleware = {};

PostMiddleware.postBodyValidator = [
  body("category")
    .notEmpty()
    .withMessage("카테고리를 선택해주세요.")
    .bail()
    .isString()
    .trim()
    .isIn(["와인추천", "와인상식", "와인샵", "가격정보"])
    .withMessage("카테고리 정보를 다시 확인해주세요.")
    .bail(),
  body("title")
    .notEmpty()
    .withMessage("제목은 필수입니다.")
    .bail()
    .isLength({min:1})
    .withMessage("제목은 1자 이상 작성해주세요")
    .bail(),
  body("content")
    .notEmpty()
    .withMessage("내용은 필수입니다.")
    .bail()
    .isLength({min:5})
    .withMessage("내용은 5자 이상 작성해주세요")
    .bail()
];

PostMiddleware.putBodyValidator = [
  body("category")
    .exists({ checkNull: true }),
  body("title")
    .exists({ checkNull: true })
    .isString()
    .trim(),
  body("content")
    .exists({ checkNull: true })
    .isString(),
];

export { PostMiddleware };
