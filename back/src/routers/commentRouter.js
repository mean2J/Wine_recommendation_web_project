import { Router } from "express";
import { CommentService } from "../services/commentService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { matchedData, validationResult } from "express-validator";
import { CommentMiddleware } from "../middlewares/commentMiddleware.js";
import {validationErrorCatcher} from "../middlewares/errorMiddleware.js";

const commentRouter = Router();

/*
 * Community : comment 생성
 */
commentRouter.post(
  "/comment",
  loginRequired,
  CommentMiddleware.postBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const userId = req.user.id
      //로그인 유저의 정보 -> author이름 정보 필요
      //const post= await postService.getPost(postId);
      const user = await UserService.getUserById(userId);

      const author = user.name;

      const { postId, content } = matchedData(req);

      const newComment = await CommentService.addComment({
        postId,
        userId,
        author,
        content
      })

      const body = {
        success: true,
        comment: newComment,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  });

/*
 * Community : 해당 포스트에 속한 comment 조회
 */
commentRouter.get(
  "/commentlist/:postId",
  loginRequired,
  async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const commentList = await CommentService.getCommentList(postId);

      const body = {
          success: true,
          commentList: commentList,
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });



/*
 * Community : comment 수정
 */
commentRouter.put(
  "/comment/:id",
  loginRequired,
  CommentMiddleware.putBodyValidator,
  async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const commentId = req.params.id;

      const toUpdate = matchedData(req);

      const updateComment = await CommentService.setComment({ commentId, toUpdate });

      const body = {
        success: true,
        comment: updateComment
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });


/*
 * Community : comment 삭제
 */
commentRouter.delete(
  "/comment/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const isDeleted = await CommentService.deleteComment(commentId);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });


export { commentRouter };
