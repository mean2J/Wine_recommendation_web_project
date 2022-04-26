import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookmarkSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  wineId: {
    type: Number,
    require:true
  },
  isChecked: {
    type: Boolean,
    require: true
  }
});

const bookmarkModel = model("User", bookmarkSchema);

export {bookmarkModel};