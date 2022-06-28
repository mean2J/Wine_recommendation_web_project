import { body } from "express-validator";

const CommentMiddleware = {};

CommentMiddleware.postBodyValidator = [
  body("content")
    .isLength({min:1, max:200})
    .withMessage("내용은 1자 이상 200자 이하로 작성해주세요"),
  body("postId")
    .notEmpty()
    .withMessage("postId를 입력해주세요")
    .bail()
];

CommentMiddleware.putBodyValidator = [
  body("title")
    .exists({ checkNull: true })
    .isString()
    .trim(),
  body("content")
    .exists({ checkNull: true })
    .isString()
];

export { CommentMiddleware };
