import mongoose from "mongoose";
const {Schema, model} = mongoose;

const BookmarkSchema = new Schema({
  //북마크 id : uuid
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
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
  },
},
{//생성, 갱신 시점
  timestamps: true,
}
);

const BookmarkModel = model("Bookmark", BookmarkSchema);

export {BookmarkModel};