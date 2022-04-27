import { User } from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async addUser({ name, email, password }) {
    // let user = await User.findUserById(id);
    //
    // if (user !== null) {
    //   const error = new Error(
    //     "이 아이디는 현재 사용중입니다. 다른 이메일을 입력해 주세요."
    //   );
    //   error.status = 400;
    //   throw error;
    // }

    if (user !== null) {
      const error = new Error(
        "이 아이디는 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
      error.status = 400;
      throw error;
    }

    user = await User.findUserByEmail(email);

    if (user !== null) {
      const error = new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
      error.status = 400;
      throw error;
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.createUser(newUser);
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findUserByEmail(email);
    console.log(user);
    if (user === null) {
      const error = new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
      error.status = 404;
      throw error;
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      const error = new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );

      error.status = 401;
      throw error;
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const { id, name, description } = user;

    const loginUser = {
      token,
      id,
      name,
      email,
      description,
      errorMessage: null,
    };

    return loginUser;
  }
}

export { UserService };
