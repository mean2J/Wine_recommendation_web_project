import {Router} from "express";
import {bookmarkService} from "../services/bookmarkService.js";
import {loginRequired} from '../middlewares/loginRequired.js';

const bookmarkRouter = Router();
bookmarkRouter.use(loginRequired);

/*
 * 북마크 생성
 */
bookmarkRouter.post("/bookmark", async (req, res, next) => {
  try {
    const userId = req.currentUserId
    const wineId = req.body.wineId;

    const newBookmark = await bookmarkService.addBookmark({
      userId,
      wineId,
    });

    const body = {
      success: true,
      bookmark: newBookmark
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 조회
 */
bookmarkRouter.get("/bookmark/:id", async (req, res, next) => {
  try {
    const bookmarkId = req.params.id;
    const bookmark = await bookmarkService.getBookmark(bookmarkId)

    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 리스트 조회
 */
bookmarkRouter.get("/bookmarklist", async (req, res, next) => {
  try {

    const userId = req.currentUserId;
    const bookmarkList = await bookmarkService.getBookmarkList(userId);

    res.status(200).json(bookmarkList);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 삭제
 */
bookmarkRouter.delete("/bookmark/:wineid", async (req, res, next) => {
  try {
    //req.params로부터 wineid 값을 받고 request로부터 currentUserId를 받아서
    //wineid와 userid(currentUserId)가 일치하는 bookmark 기록 삭제
    const userId = req.currentUserId;
    const wineId = req.params.wineid;
    const isDeleted = await bookmarkService.deleteBookmark({userId,wineId});

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});

export {bookmarkRouter};