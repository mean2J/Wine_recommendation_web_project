import {validationResult} from "express-validator";

function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);

  const body = {
    success: false,
    error: {
      code: error.status,
      message: error.message
    }
  };
  res
    .status(error.status)
    .send(body);
}

function validationErrorCatcher(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty())
    return next();

  const error = new Error(
    errors.array()[0].msg
  );
  error.status = 400;
  throw error;
}

export { errorMiddleware, validationErrorCatcher };
