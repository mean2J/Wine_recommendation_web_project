import {Router} from "express";
import {bookmarkService} from "../services/bookmarkService.js";

const bookmarkRouter = Router();

/*
 * 북마크 생성
 */
bookmarkRouter.post("/bookmark", async (req, res, next) => {
  try {
    const userId = "userid";//loginRequired 미들웨어 적용 필요
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
bookmarkRouter.get("/bookmarklist/:userId", async (req, res, next) => {
  try {
    //loginRequired 미들웨어 적용 필요
    console.log(req.params.userId);
    const userId = req.params.userId;
    const bookmarkList = await bookmarkService.getBookmarkList(userId);

    res.status(200).json(bookmarkList);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 삭제
 */
bookmarkRouter.delete("/bookmark/:id", async (req, res, next) => {
  try {
    //req.params로부터 bookmarkId 값을 받아서 해당 id의 북마크 기록을 삭제
    const bookmarkId = req.params.id
    const isDeleted = await bookmarkService.deleteBookmark(bookmarkId);

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});

export {bookmarkRouter};
