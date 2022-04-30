import {Bookmark} from "../db/index.js";
import {Wine} from "../db/index.js";
import { v4 as uuidv4 } from 'uuid';

class bookmarkService {
  static async addBookmark({userId, wineId}) {
    let bookmark = await Bookmark.findBookmarkByWineId({userId, wineId});
    let wineInfo = await Wine.findWineById(wineId);
    if ( bookmark ) {
      const error = new Error(
        "이미 북마크한 와인입니다."
      );
      throw error;
    }
    if ( !wineInfo ) {
      const error = new Error(
        "존재하지 않는 와인입니다."
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
    const listLength = Object.keys(bookmarkList).length
    
    let bookmarkWineList = [];
    for (let i = 0; i < listLength; i++){
      //bookmarkId
      let bookmarkId = bookmarkList[i].id;
      let bookmarkCreate = bookmarkList[i].createdAt;
      //wineId와 wineInfo
      let wineId = bookmarkList[i].wineId;
      let wineInfo = await Wine.findWineById(wineId);
      let bookmarkWine = {
        "bookmarkId" : bookmarkId,
        "bookmarkCreate" : bookmarkCreate,
        "wineInfo" : wineInfo
      }
      bookmarkWineList[i] = bookmarkWine;
    }
    return bookmarkWineList;
  }

  static async getBookmarkListPage({userId, page, maxBookmark}) {
    const bookmarkList = await Bookmark.findBookmarkByUserIdPage({userId, page, maxBookmark});
    const listLength = Object.keys(bookmarkList).length
    let bookmarkWineList = [];
    for (let i = 0; i < listLength; i++){
      //bookmarkId
      let bookmarkId = bookmarkList[i].id;
      let bookmarkCreate = bookmarkList[i].createdAt;
      //wineId와 wineInfo
      let wineId = bookmarkList[i].wineId;
      let wineInfo = await Wine.findWineById(wineId);
      let bookmarkWine = {
        "bookmarkId" : bookmarkId,
        "bookmarkCreate" : bookmarkCreate,
        "wineInfo" : wineInfo
      }
      bookmarkWineList[i] = bookmarkWine;
      console.log(bookmarkWineList);
    }
    return bookmarkWineList;
  }

  static async deleteBookmark({userId,wineId}) {
    const isDataDeleted = await Bookmark.deleteBookmarkById({userId,wineId});
    if (isDataDeleted === false) {
      const error = new Error(
        "북마크하지 않은 와인은 해제할 수 없습니다."
      );
      throw error;
    }
    return {status : '삭제 ok'};
  }

  static async deleteAllBookmark({userId}){
    await Bookmark.deleteBookmarkAllByUserId({userId});
  }
}

export {bookmarkService};