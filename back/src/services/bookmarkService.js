import {Bookmark} from "../db/index.js";
import {Wine} from "../db/index.js";
import {v4 as uuidv4} from "uuid";

class BookmarkService {
  static async addBookmark({userId, wineId}) {
    const bookmark = await Bookmark.findBookmarkByWineId({userId, wineId});
    const wineInfo = await Wine.findWineById(wineId);
    if (bookmark) {
      const error = new Error(
        "이미 북마크한 와인입니다."
        );
      error.status = 400;
      throw error;
    }
    if (!wineInfo) {
      const error = new Error(
        "존재하지 않는 와인입니다."
        );
      error.status = 400;
      throw error;
    }

    const id = uuidv4();
    const newBookmark = {id, userId, wineId};

    // db에 저장
    const createdNewBookmark = await Bookmark.createBookmark(newBookmark);
    createdNewBookmark.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewBookmark;
  }

  static async getBookmark(BookmarkId) {
    return Bookmark.findBookmarkById(BookmarkId);
  }

  // static async getFinalPage({userId, maxBookmark}) {
  //   const finalPage = await Bookmark.findFinalPage({userId, maxBookmark});
  //   return finalPage;
  // }

  static async getBookmarkList(userId) {
    const bookmarkList = await Bookmark.findBookmarkByUserId(userId);

    if (!bookmarkList) {
      const error = new Error(
        "북마크한 와인이 없습니다. 먼저 관심있는 와인을 북마크해주세요."
      );
      error.status = 404;
      throw error;
    }

    const listLength = Object.keys(bookmarkList).length;

    let bookmarkWineList = [];
    for (let i = 0; i < listLength; i++) {
      //bookmarkId와 createAt
      let bookmarkId = bookmarkList[i].id;
      let bookmarkCreate = bookmarkList[i].createdAt;
      //wineId와 wineInfo
      let wineId = bookmarkList[i].wineId;
      let wineInfo = await Wine.findWineById(wineId);
      if (!wineInfo) {
        const error = new Error(
          "정보가 없는 와인ID입니다. 고객센터에 문의하세요."
        );
        error.status = 404;
        throw error;
      }
      let bookmarkWine = {
        bookmarkId: bookmarkId,
        bookmarkCreate: bookmarkCreate,
        wineInfo: wineInfo,
      };
      bookmarkWineList[i] = bookmarkWine;
    }
    return bookmarkWineList;
  }

  static async getBookmarkListPage({userId, page, maxBookmark}) {
    const bookmarkList = await Bookmark.findBookmarkByUserIdPage({
      userId,
      page,
      maxBookmark,
    });
    const listLength = Object.keys(bookmarkList).length;
    let bookmarkWineList = [];
    for (let i = 0; i < listLength; i++) {
      //bookmarkId와 createAt
      let bookmarkId = bookmarkList[i].id;
      let bookmarkCreate = bookmarkList[i].createdAt;
      //wineId와 wineInfo
      let wineId = bookmarkList[i].wineId;
      let wineInfo = await Wine.findWineById(wineId);
      let bookmarkWine = {
        bookmarkId: bookmarkId,
        bookmarkCreate: bookmarkCreate,
        wineInfo: wineInfo,
      };
      bookmarkWineList[i] = bookmarkWine;
    }
    return bookmarkWineList;
  }

  static async deleteBookmark({userId, wineId}) {
    const isDataDeleted = await Bookmark.deleteBookmarkById({userId, wineId});
    if (isDataDeleted === false) {
      const error = new Error("북마크하지 않은 와인은 해제할 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }

  static async deleteAllBookmark({userId}) {
    await Bookmark.deleteBookmarkAllByUserId({userId});
  }
}

export {BookmarkService};
