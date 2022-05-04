import mongoose from "mongoose";
const {Schema, model} = mongoose;

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
  //커뮤니티 post 카테고리(ex.와인리뷰, 와인정보, 와인뉴스)
  category: {
    type: String,
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
  numId:{
    type:Number
  }

},
{//생성, 갱신 시점
  timestamps: true,
}
);

const PostModel = model("Post", PostSchema);

export {PostModel};