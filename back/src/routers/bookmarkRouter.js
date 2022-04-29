import { Router } from "express";
import { bookmarkService } from "../services/bookmarkService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { bookmarkModel } from "../db/schemas/bookmark.js";

const bookmarkRouter = Router();
bookmarkRouter.use(loginRequired);

/*
 * 북마크 생성
 */
bookmarkRouter.post("/bookmark", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const wineId = req.body.wineId;

    const newBookmark = await bookmarkService.addBookmark({
      userId,
      wineId,
    });

    const body = {
      success: true,
      bookmark: newBookmark,
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
    const bookmark = await bookmarkService.getBookmark(bookmarkId);

    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 모든 리스트 조회
 */
bookmarkRouter.get("/bookmarklist", async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const bookmarkList = await bookmarkService.getBookmarkList(userId);

    const body = {
      success: true,
      bookmark: bookmarkList,
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 리스트 조회(페이징)
 */
bookmarkRouter.get("/bookmarklistpage", async (req, res, next) => {
  try {
    const page = req.query.page || 1; // default 1페이지
    const maxBookmark = req.query.maxBookmark || 10; //default 10개
    const userId = req.currentUserId;
    /** 서비스단으로 이동 예정 */
    const totalBookmark = await bookmarkModel.countDocuments({ userId }).exec();
    const finalPage = Math.ceil(totalBookmark / maxBookmark);

    const bookmarkList = await bookmarkService.getBookmarkListPage({
      userId,
      page,
      maxBookmark,
    });

    const body = {
      success: true,
      page: page,
      finalPage: finalPage,
      bookmark: bookmarkList,
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 삭제
 */
bookmarkRouter.delete("/bookmark/:wineid", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const wineId = req.params.wineid;
    const isDeleted = await bookmarkService.deleteBookmark({ userId, wineId });

    res.status(200).json(isDeleted);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 모두삭제
 */
bookmarkRouter.delete("/bookmarklist/alldelete", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const isDeleted = await bookmarkService.deleteAllBookmark({ userId });

    res.status(200).send("allDelete");
  } catch (error) {
    next(error);
  }
});

export { bookmarkRouter };
