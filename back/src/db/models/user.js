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

  static async findUserByName(name) {
    const user = await UserModel.findOne({name: name});
    return user;
  }

  static async exists(filter) {
    const itExists = await UserModel.exists(filter);
    return itExists;
  }

  static async updateUser(userId, fieldToUpdate) {
    const filter = {id: userId};
    const option = {returnOriginal: false};

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      {$set: fieldToUpdate},
      option
    );
    return updatedUser;
  }

  static async deleteUser(userId) {
    await UserModel.findOneAndDelete({id: userId});
  }
}

export {User};
