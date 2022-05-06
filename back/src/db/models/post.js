import {PostModel} from "../schemas/post.js";

class Post {
  /**
   * Post 객체 생성
   */
  static async createPost(Post) {
    const newPost = await PostModel.create(Post);
    return newPost;
  }

  /**
   * PostId(=id)로 해당 post 찾아서 리턴
   */
  static async findPostById(postId) {
    const post = await PostModel.findOne({id: postId});
    return post;
  }


  /**
   * 각 category(or 전체보기)의 마지막 페이지 번호 반환
   */
  static async findFinalPage({category, maxPost}) {
    const totalPost = (category === null) 
    ? await PostModel.countDocuments()
    : await PostModel.countDocuments({category});
    const finalPage = Math.ceil(totalPost / maxPost);
    return finalPage;
  }

  /**
   * { category, page, maxPost}
   * 각 category(or 전체보기)의 post 리스트를 maxPost 단위로 페이징하여 반환
   */
  static async findPostPage({category, page, maxPost}) {

    if (category == null) {
      return PostModel
        .find({}) //모든 post 게시글을
        .sort({createdAt: -1}) //createAt 기준으로 정렬
        .limit(maxPost) //한페이지에서 확인할 수 있는 post의 수
        .skip((page - 1) * maxPost) //페이지에 따른 skip 기준
        .lean();
    } else {
      return PostModel
        .find({category}) //category로 post 게시글을 구분하고
        .sort({createdAt: -1}) //createAt 기준으로 정렬
        .limit(maxPost) //한페이지에서 확인할 수 있는 post의 수
        .skip((page - 1) * maxPost) //페이지에 따른 skip 기준
        .lean();
    }

  }

  /**
   * 기존의 post를 수정하고 수정한 post를 return 하는 함수
   */
  static async update({postId, fieldToUpdate, newValue}) {
    const filter = {id: postId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPost;
  }

  /**
   * postId 와 매칭되는 데이터 삭제
   */
  static async deletePostById(postId) {
    const deleteResult = await PostModel.deleteOne({id: postId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Post};
