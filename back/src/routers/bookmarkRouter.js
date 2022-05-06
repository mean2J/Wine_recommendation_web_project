import { Router } from "express";
import { BookmarkService } from "../services/bookmarkService.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const bookmarkRouter = Router();

/*
 * 북마크 생성
 */
bookmarkRouter.post("/bookmark", loginRequired, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { wineId } = req.body;

    const newBookmark = await BookmarkService.addBookmark({
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
bookmarkRouter.get("/bookmark/:id", loginRequired, async (req, res, next) => {
  try {
    const bookmarkId = req.params.id;
    const bookmark = await BookmarkService.getBookmark(bookmarkId);

    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
});

/*
 * 북마크 모든 리스트 조회
 */
bookmarkRouter.get("/bookmarklist", loginRequired, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookmarkList = await BookmarkService.getBookmarkList(userId);

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
bookmarkRouter.get(
  "/bookmarklistpage",
  loginRequired,
  async (req, res, next) => {
    try {
      const page = req.query.page || 1; // default 1페이지
      const maxBookmark = req.query.maxBookmark || 10; //default 10개
      const userId = req.user.id;

      //const finalPage = BookmarkService.getFinalPage({userId, maxBookmark});
      const bookmarkList = await BookmarkService.getBookmarkListPage({
        userId,
        page,
        maxBookmark,
      });

      const body = {
        success: true,
        page: page,
        bookmark: bookmarkList,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * 북마크 삭제
 */
bookmarkRouter.delete(
  "/bookmark/:wineid",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const wineId = req.params.wineid;
      const isDeleted = await BookmarkService.deleteBookmark({
        userId,
        wineId,
      });

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * 북마크 모두삭제
 */
bookmarkRouter.delete(
  "/bookmarklist/alldelete",
  loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const isDeleted = await BookmarkService.deleteAllBookmark({ userId });

      res.status(200).send("allDelete");
    } catch (error) {
      next(error);
    }
  }
);

export { bookmarkRouter };
