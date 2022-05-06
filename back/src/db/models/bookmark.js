import {BookmarkModel} from "../schemas/bookmark.js";

class Bookmark {
/**
 * Bookmark 객체 생성
 */
  static async createBookmark(Bookmark) {
    const newBookmark = await BookmarkModel.create(Bookmark);
    return newBookmark;
  }

/**
 * BookmarkId(=id)로 bookmark 리스트에 존재하는지 확인
 */
  static async findBookmarkById(BookmarkId) {
    const bookmark = await BookmarkModel.findOne({id: BookmarkId}).lean();
    return bookmark;
  }

/**
 * {userId,wineId}로 해당와인이 bookmark 리스트에 존재하는지 확인
 */
  static async findBookmarkByWineId({userId,wineId}) {
    const bookmark = await BookmarkModel.findOne({userId,wineId}).lean();
    return bookmark;
  }

/**
 * userId로 bookmark 리스트 찾아서 반환
 */
  static async findBookmarkByUserId(userId) {
    const bookmarkListAll = await BookmarkModel.find({userId}).lean();
    return bookmarkListAll;
  }


/**
 * {userId, page, maxBookmark}
 * userId로 찾은 bookmark 리스트를 maxBookmark 단위로 페이징하여 반환
 */
  static async findBookmarkByUserIdPage({userId, page, maxBookmark}) {
    
    const bookmarkListPage =
    await BookmarkModel
    .find({userId}).lean() //userID로 bookmark 기록을 찾아서
    .sort({createdAt: -1}) //createAt 기준으로 정렬
    .limit(maxBookmark) //한페이지에서 확인할 수 있는 bookmark의 수 
    .skip((page - 1) * maxBookmark) //페이지에 따른 skip 기준
    .exec();
    

    return bookmarkListPage;
  }

/**
 * {userId,wineId}와 매칭되는 document 하나를 삭제
 */
  static async deleteBookmarkById({userId,wineId}) {
    const deleteResult = await BookmarkModel.deleteOne({userId,wineId});
    const isDataDeleted = (deleteResult.deletedCount === 1);
    return isDataDeleted;
  }

/**
 * userId와 매칭되는 북마크리스트 전체를 삭제
 * 
 */
   static async deleteBookmarkAllByUserId({userId}) {
    await BookmarkModel.deleteMany({userId});
  }

}



export {Bookmark};
