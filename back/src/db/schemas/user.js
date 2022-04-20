import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: "안녕하세요!"
  }
});

const UserModel = model("User", UserSchema);

export {UserModel};