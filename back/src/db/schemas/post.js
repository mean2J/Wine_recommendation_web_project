import mongoose from "mongoose";
const {Schema, model} = mongoose;

const categories = ["와인추천", "와인상식", "와인샵", "가격정보"];

const PostSchema = new Schema({
  //커뮤니티 post 아이디
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  //커뮤니티 post 카테고리(ex.와인추천, 와인상식, 와인샵, 가격정보 등)
  category: {
    type: String,
    enum: [...categories],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  view: {
    type:Number,
    default:0
  },
},
{//생성, 갱신 시점
  timestamps: true,
}
);

const PostModel = model("Post", PostSchema);

export {PostModel};