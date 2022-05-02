import mongoose from "mongoose";

 const commentSchema = new Schema({
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    userId: {
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
  
  const commentModel = model("Comment", commentSchema);
  
  export {commentModel};