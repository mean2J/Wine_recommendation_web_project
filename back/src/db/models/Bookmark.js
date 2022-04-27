import {bookmarkModel} from "../schemas/bookmark.js";

class Bookmark {
/**
 * Bookmark 객체 생성
 */
  static async createBookmark(Bookmark) {
    const newBookmark = await bookmarkModel.create(Bookmark);
    return newBookmark;
  }
/**
 * BookmarkId(=id)로 bookmark 리스트에 존재하는지 확인
 */
  static async findBookmarkById(BookmarkId) {
    const bookmark = await bookmarkModel.findOne({id: BookmarkId});
    return bookmark;
  }
/**
 * {userId,wineId}로 해당와인이 bookmark 리스트에 존재하는지 확인
 */
  static async findBookmarkByWineId({userId,wineId}) {
    const bookmark = await bookmarkModel.findOne({userId,wineId});
    return bookmark;
  }

/**
 * userId로 bookmark 리스트 찾아서 반환
 */
  static async findBookmarkByUserId(userId) {
    const bookmarkList = await bookmarkModel.find({userId});
    return bookmarkList;
  }

/**
 * {userId,wineId}와 매칭되는 document 하나를 삭제
 */
  static async deleteBookmarkById({userId,wineId}) {
    const deleteResult = await bookmarkModel.deleteOne({userId,wineId});
    const isDataDeleted = (deleteResult.deletedCount === 1);
    return isDataDeleted;
  }
}



export {Bookmark};
