import {Comment} from "../db/index.js";
import {v4 as uuidv4} from "uuid";

class CommentService {
  /**
   * Community : comment 생성
   */
  static async addComment({postId, userId, author, content}) {
    const id = uuidv4();
    const newComment = {id, postId, userId, author, content};

    // db에 저장
    const createdNewComment = await Comment.createComment(newComment);
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  /**
   * Community : commentId로 comment 읽기
   */
  static async getComment(commentId) {
    const comment = await Comment.findCommentById(commentId);
    return comment;
  }

  /**
   * Community : postId로 commentList 읽기
   */
  static async getCommentList(postId) {
    const commentList = await Comment.findCommentListByPostId(postId);
    return commentList;
  }

  /**
   * Community : comment 수정
   */
  static async setComment({commentId, toUpdate}) {
    let comment = await Comment.findCommentById(commentId);

    if (!comment) {
      const error = new Error("수정할 댓글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    const myKeys = Object.keys(toUpdate);

    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]] !== null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        comment = await Comment.update({commentId, fieldToUpdate, newValue});
      }
    }

    return comment;
  }

  /**
   * Community : comment 삭제
   */
  static async deleteComment(commentId) {
    const isDataDeleted = await Comment.deleteCommentById(commentId);
    if (isDataDeleted === false) {
      const error = new Error("삭제할 게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
}

export {CommentService};
