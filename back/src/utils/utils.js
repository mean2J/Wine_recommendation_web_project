import dayjs from "dayjs";
import jwt from "jsonwebtoken";

function removeFields(document, [...args]) {
  return Object
    .entries(document)
    .filter(([key, value]) => !args.includes(key))
    .reduce((res, [key, value]) => {
      res[key] = value;
      return res;
    }, {});
}

function issueJWT(user) {
  const id = user.id;
  const expiresIn = "1d";
  const date = dayjs().unix();

  const payload = {
    id: id,
    iat: date
  }

  const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const signedToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  };
}

export { removeFields , issueJWT };