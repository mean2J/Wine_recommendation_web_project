import { Wine } from "../db/index.js";

class SearchService {
  //wine 이름 검색 기능 (전체 리스트)
  static async getWineByName({ name }) {
    const wines = await Wine.findWineByName(name);

    return wines;
  }

  //wine 이름 검색 기능 (pagination 적용)
  static async getWineByNamePaged({ name, page, perPage }) {
    const total = await (await Wine.findWineByName(name)).length;
    const wines = await Wine.findWineByNamePaged({ name, page, perPage });

    const totalPage = Math.ceil(total / perPage);
    return { wines, totalPage };
  }
}

export { SearchService };
