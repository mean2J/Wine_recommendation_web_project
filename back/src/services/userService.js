import { User } from "../db/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class UserService {
  static async addUser({ name, email, password }) {
    // const idExists = await User.exists({id: id});
    //
    // if (idExists) {
    //   const error = new Error(
    //     "이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요."
    //   );
    //   error.status = 400;
    //   throw error;
    // }

    const emailExists = await User.exists({ email: email });

    if (emailExists) {
      const error = new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
      error.status = 400;
      throw error;
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();

    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.createUser(newUser);
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const emailExists = await User.exists({ email: email });

    if (!emailExists) {
      const error = new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
      error.status = 404;
      throw error;
    }

    const user = await User.findUserByEmail(email);

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
    };

    return loginUser;
  }

  static async getUserById(userId) {
    // db에 유저 존재 여부 확인
    const userExists = await User.exists({ id: userId });

    if (!userExists) {
      const error = new Error(
        "해당 유저 아이디로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
      error.status = 404;
      throw error;
    }

    const user = await User.findUserById(userId);

    return user;
  }

  static async updateUser(userId, fieldToUpdate) {
    const idExists = await User.exists({ id: userId });

    if (!idExists) {
      const error = new Error("존재하지 않는 사용자입니다.");
      error.status = 404;
      throw error;
    }

    // password 필드가 존재한다면
    if (fieldToUpdate["password"] !== undefined) {
      // 암호화
      fieldToUpdate["password"] = await bcrypt.hash(
        fieldToUpdate["password"],
        10
      );
    }
    const user = await User.updateUser(userId, fieldToUpdate);

    return user;
  }

  static async deleteUser(userId) {
    const idExists = await User.exists({ id: userId });

    if (!idExists) {
      const error = new Error("존재하지 않는 사용자입니다.");
      error.status = 404;
      throw error;
    }

    await User.deleteUser(userId);
  }
}

export { UserService };
