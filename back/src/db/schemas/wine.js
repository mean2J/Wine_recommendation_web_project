//wine정보에 대한 schema
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WineSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  nation: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  varieties: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  abv: {
    type: String,
    required: true,
  },
  sweet: {
    type: Number,
    required: true,
  },
  acidity: {
    type: Number,
    required: true,
  },
  body: {
    type: Number,
    required: true,
  },
  tannin: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ImageURL: {
    type: String,
    required: true,
  },
});

const WineModel = model("Wine", WineSchema);

export { WineModel };
