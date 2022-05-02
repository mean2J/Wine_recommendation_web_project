import mongoose from "mongoose";
const {Schema, model} = mongoose;

const postSchema = new Schema({
  //커뮤니티 post 아이디
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  //커뮤니티 post 카테고리 : 와인리뷰, 와인정보, 와인뉴스
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

},
{//생성, 갱신 시점
  timestamps: true,
}
);

const postModel = model("Post", postSchema);

export {postModel};