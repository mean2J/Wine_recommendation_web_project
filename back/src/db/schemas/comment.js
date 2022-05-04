import mongoose from "mongoose";
const {Schema, model} = mongoose;

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    //생성, 갱신 시점
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export {CommentModel};
