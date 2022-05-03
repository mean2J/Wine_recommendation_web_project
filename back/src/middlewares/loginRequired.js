import { passport } from "../auths/passport/index.js";

function loginRequired(req, res, next) {
  return passport.authenticate("jwtStrategy", { session: false })(req, res, next);
}

export { loginRequired };
