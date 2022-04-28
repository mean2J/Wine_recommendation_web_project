import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    id: {
      type: String,
      index: true,
      unique: true,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: false
    },
    wine: {
      type: Schema.Types.ObjectId,
      ref: "Wine",
      required: false
    }
  }, {timestamps: true}
);

export const ReviewModel = model("Review", ReviewSchema);