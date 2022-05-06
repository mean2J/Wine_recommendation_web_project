import {CommentModel} from "../schemas/comment.js";

class Comment {
  static async createComment(Comment) {
    const newComment = await CommentModel.create(Comment);
    return newComment;
  }

  static async findCommentById(commentId) {
    const comment = await CommentModel.findOne({id:commentId}).lean();
    return comment;
  }

  static async findCommentListByPostId(postId) {
    const commentList = await CommentModel.find({postId}).lean();
    return commentList;
  }

  static async update({commentId, fieldToUpdate, newValue}) {
    const filter = {id: commentId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteCommentById(commentId) {
    const deleteResult = await CommentModel.deleteOne({id: commentId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Comment};
