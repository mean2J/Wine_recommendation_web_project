import {bookmarkModel} from "../schemas/bookmark.js";

class Bookmark {
  static async createBookmark(Bookmark) {
    const newBookmark = await bookmarkModel.create(Bookmark);
    return newBookmark;
  }

  static async findBookmarkById(BookmarkId) {
    const bookmark = await bookmarkModel.findOne({id: BookmarkId});
    return bookmark;
  }

  static async findBookmarkByWineId(wineId) {
    const bookmark = await bookmarkModel.findOne({wineId});
    return bookmark;
  }

/**
 * 
 * userId로 bookmark 리스트 찾아서 반환
 */
  static async findBookmarkByUserId(userId) {
    const bookmarkList = await bookmarkModel.find({userId});
    console.log(bookmarkList)
    return bookmarkList;
  }

/**
 *  
 * bookmark 컬렉션에서 bookmarkId와 매칭되는 document 하나를 삭제하는 함수
 */
  static async deleteBookmarkById(BookmarkId) {
    const deleteResult = await bookmarkModel.deleteOne({id: BookmarkId});
    return deleteResult
  }
}



export {Bookmark};
