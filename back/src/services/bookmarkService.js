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
    //찾은 북마크 리스트 중 n번 북마크의 wineId로
    //bookmarkList.
    //wine DB에서 해당 와인 정보를 구한다.
    //구한 와인 정보에서 필요한 정보만 뽑아 json 형식으로 반환한다.
    //wine = Wine.findWineById(wineId)
    console.log(bookmarkList)
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
