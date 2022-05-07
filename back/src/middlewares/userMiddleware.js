import { body } from "express-validator";

const UserMiddleware = {};

UserMiddleware.signUpBodyValidator = [
  body("name")
    .notEmpty()
    .withMessage("이름 정보는 필수입니다.")
    .bail()
    .isString()
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
];

UserMiddleware.signInBodyValidator = [
  body("email")
    .notEmpty()
    .withMessage("이메일 정보는 필수입니다.")
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다.")
    .bail()
    .isString(),
];

UserMiddleware.putBodyValidator = [
  body("name")
    .exists({ checkNull: true })
    .isString()
    .trim(),
  body("password")
    .exists({ checkNull: true })
    .isString(),
  body("description")
    .exists({ checkNull: true })
    .isString(),
];

export { UserMiddleware };
