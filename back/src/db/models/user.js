import { UserModel } from "../schemas/user.js";

class User {
  // 유저 정보를 db에 등록함
  static async createUser(User) {
    const newUser = await UserModel.create(User);
    return newUser;
  }

  // 유저 id로 유저를 검색함
  static async findUserById(userId) {
    const user = await UserModel.findOne({ id: userId }).lean();
    return user;
  }

  // 이메일로 유저를 검색함
  static async findUserByEmail(email) {
    const user = await UserModel.findOne({ email: email }).lean();
    return user;
  }

  // 유저 닉네임으로 유저를 검색함
  static async findUserByName(name) {
    const user = await UserModel.findOne({ name: name }).lean();
    return user;
  }

  // 입력받은 정보로 유저가 db에 존재하는지 찾음
  static async exists(filter) {
    const itExists = await UserModel.exists(filter);
    return itExists;
  }

  // 유저 정보를 업데이트함
  static async updateUser(userId, fieldToUpdate) {
    const filter = { id: userId };
    const option = { returnOriginal: false };

    // 최종 update 시각을 갱신하고 싶을 때만 입력값에 시각 정보가 포함되어 있음
    option.timestamps = !fieldToUpdate.hasOwnProperty("updateTimestamp");

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      option
    ).lean();
    return updatedUser;
  }

  // 유저를 db에서 삭제함
  static async deleteUser(userId) {
    await UserModel.findOneAndDelete({ id: userId });
  }
}

export { User };
