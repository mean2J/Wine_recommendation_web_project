import mongoose from "mongoose";
const {Schema, model} = mongoose;

const bookmarkSchema = new Schema({
  //북마크 id : uuid
  id: {
    type: String,
    required: true
  },
  //로그인한 유저의 아이디
  userId: {
    type: String,
    required: true
  },
  //클릭한 와인의 아이디
  wineId: {
    type: Number,
    require:true
  }
});

const bookmarkModel = model("Bookmark", bookmarkSchema);

export {bookmarkModel};