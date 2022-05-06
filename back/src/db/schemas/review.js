import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    id: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      index: true,
      required: true
    },
    content: {
      type: String,
      required: false
    },
    wine: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }, {timestamps: true}
);

export const ReviewModel = model("Review", ReviewSchema);