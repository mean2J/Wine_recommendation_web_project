import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    required: false
  },
  name: {
    type: String,
    index: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  recentLogin: {
    type: Date,
    required: false
  }
}, {timestamps: true}
);

export const UserModel = model("User", UserSchema);