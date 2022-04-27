import {UserModel} from "../schemas/user.js";

class User {
  static async createUser(User) {
    const newUser = await UserModel.create(User);
    return newUser;
  }

  static async findUserById(userId) {
    const user = await UserModel.findOne({id: userId});
    return user;
  }

  static async findUserByEmail(email) {
    const user = await UserModel.findOne({email: email});
    return user;
  }

  static async updateUser({}) {

  }

  static async deleteUser() {

  }
}

export {User};
