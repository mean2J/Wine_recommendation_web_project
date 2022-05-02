import {commentModel} from "../schemas/comment.js";
import {postModel} from "../schemas/post.js";

class Comment {
  static async createComment(Comment) {
    const newComment = await commentModel.create(Comment);
    return newComment;
  }

  static async findCommentById(commentId) {
    const commentList = await commentModel.findOne({id:commentId});
    return commentList;
  }

  static async findCommentListByPostId(postId) {
    const commentList = await commentModel.find({postId});
    console.log(commentList);
    return commentList;
  }

  static async update({commentId, fieldToUpdate, newValue}) {
    const filter = {id: commentId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedComment = await commentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteCommentById(commentId) {
    const deleteResult = await commentModel.deleteOne({id: commentId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Comment};
