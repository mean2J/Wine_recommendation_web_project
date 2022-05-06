import { Router } from "express";
import { PostService } from "../services/postService.js";
import { UserService } from "../services/userService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { body, validationResult } from "express-validator";

const postRouter = Router();

/*
 * Community : Post 생성
 */
postRouter.post("/post",
body("category", "카테고리를 선택해주세요.").isString(),
body("title", "제목은 5자 이상 50자 이하로 작성해주세요").isLength({min:5, max:50}),
body("content", "내용은 10자 이상 1000자 이하로 작성해주세요").isLength({min:10, max:1000}),
loginRequired,
async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      //errors.statusCode = 400;
      res.status(400).json(errors.errors);
      throw errors;
    }
    //로그인한 유저의 고유id 
    const userId = req.user.id
    //로그인 유저의 정보 -> author이름 정보 필요
    const user = await UserService.getUserById(userId);
    
    const author = user.name;
    const {category, title, content} = req.body;   

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
 * Community : Post 조회(요청시마다 view +1)
 */
postRouter.get("/post/:id", loginRequired, async (req, res, next) => {
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
        post: post,
      };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});



/*
 * Community : Post 리스트(제목) 조회(페이징)
 */
postRouter.get("/postlist", loginRequired, async (req, res, next) => {
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
postRouter.put("/post/:id", loginRequired, async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const postId = req.params.id;

      const title = req.body.title ?? null;
      const content = req.body.content ?? null;

      const toUpdate = { title, content };

      const updatePost = await PostService.setPost({ postId, toUpdate });

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
postRouter.delete("/post/:id", loginRequired, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const isDeleted = await PostService.deletePost(postId);

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});


export { postRouter };
