import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  // 토큰이 "null" 일 경우, loginRequired 가 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    console.log("토큰 없음");
    const error = new Error("로그인한 유저만 사용할 수 있는 서비스입니다.");
    error.status = 403;
    throw error;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const userId = jwtDecoded.userId;

    req.currentUserId = userId;

    next();
  } catch (err) {
    const error = new Error("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    error.status = 403;
    throw error;
  }
}

export { loginRequired };
