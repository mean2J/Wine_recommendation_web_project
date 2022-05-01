import mongoose from "mongoose";
const {Schema, model} = mongoose;

const communitySchema = new Schema({
  //커뮤니티 포스트 아이디
  id: {
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
    required: false
  },
  //커뮤니티 카테고리 : 와인리뷰, 와인정보, 와인뉴스
  category: {
    type: String,
    required: true
  },

},
{//생성, 갱신 시점
  timestamps: true,
}
);

const communityModel = model("Community", communitySchema);

export {communityModel};