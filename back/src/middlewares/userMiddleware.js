import {validationResult} from "express-validator";

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

export {validationErrorCatcher};