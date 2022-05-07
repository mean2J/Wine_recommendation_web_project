import { Router } from "express";
import { PostService } from "../services/postService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { matchedData } from "express-validator";
import { validationErrorCatcher } from "../middlewares/errorMiddleware.js";
import { PostMiddleware } from "../middlewares/postMiddleware.js";

const postRouter = Router();

/*
 * Community : Post 생성
 */
postRouter.post("/post",
  loginRequired,
  PostMiddleware.postBodyValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const userId = req.user.id
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await UserService.getUserById(userId);

      const author = user.name;

      const {category, title, content} = matchedData(req);

      const newPost = await PostService.addPost({
        userId,
        author,
        category,
        title,
        content
      })

      const body = {
        success: true,
        post: newPost,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
});

/*
 * Community : Post 조회
 */
postRouter.get(
  "/post/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post =await PostService.getPost(postId);

      const body = {
          success: true,
          post: post,
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });


/*
 * Community : Post 조회수 증가 라우터(요청시마다 view +1)
 */
postRouter.get(
  "/post/view/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post =
      await PostService.getPost(postId)
      .then((post)=>{
        post.view++;
        post.save();
        return post;
      })

      const body = {
          success: true,
          view: post.view
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });



/*
 * Community : Post 리스트(제목) 조회(페이징)
 */
postRouter.get(
  "/postlist",
  loginRequired,
  async (req, res, next) => {
    try {
      const category = req.query.category || null //입력 없으면 null값
      const page = +req.query.page || 1; // default 1페이지
      const maxPost = +req.query.maxPost || 10; //default 10개
      const finalPage = await PostService.getFinalPage({category, maxPost});
      const postList = await PostService.getPostListPage({
        category,
        page,
        maxPost,
      });

      const body = {
        success: true,
        page: page,
        finalPage: finalPage,
        postList: postList,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
});

/*
 * Community : Post 수정
 */
postRouter.put(
  "/post/:id",
  loginRequired,
  PostMiddleware.putBodyValidator,
  async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const postId = req.params.id;

      const toUpdate = matchedData(req);

      const updatePost = await PostService.setPost({postId, toUpdate });

      const body = {
        success: true,
        post: updatePost
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });


/*
 * Community : Post 삭제
 */
postRouter.delete(
  "/post/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const isDeleted = await PostService.deletePost(postId);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });


export { postRouter };
