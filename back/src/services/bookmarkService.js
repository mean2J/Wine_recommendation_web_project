import {Bookmark} from "../db/index.js";
import {Wine} from "../db/index.js";
import { v4 as uuidv4 } from 'uuid';

class bookmarkService {
  static async addBookmark({userId, wineId}) {
    let bookmark = await Bookmark.findBookmarkByWineId(wineId);
    if (bookmark) {
      const error = new Error(
        "이미 북마크한 와인입니다."
      );
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

  static async getBookmarkList(userId) {
    const bookmarkList = await Bookmark.findBookmarkByUserId(userId);
    let obj = {};
    for (let key in bookmarkList){
      //console.log("wineId",bookmarkList[key].wineId);
      let wineId = bookmarkList[key].wineId;
      let wine = await Wine.findWineById(wineId);
      obj[key] = wine;
      //console.log(obj);
    }
    return obj;
  }

  static async deleteBookmark(BookmarkId) {
    const isDataDeleted = await Bookmark.deleteBookmarkById(BookmarkId);

    if (!isDataDeleted) {
      const errorMessage = '해당 id를 가진 북마크데이터는 없습니다.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export {bookmarkService};
