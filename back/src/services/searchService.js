import { Wine } from "../db/index.js";
import { ReviewService } from "../services/reviewService.js";

class SearchService {
  //wine 이름 검색 기능 (전체 리스트)
  static async getWineByName({ name }) {
    const wines = await Wine.findWineByName(name);

    return wines;
  }

  //wine 이름 검색 기능 (pagination 적용)
  static async getWineByNamePaged({ name, page, perPage }) {
    const total = await (await Wine.findWineByName(name)).length;
    const totalPage = Math.ceil(total / perPage);
    const wines = await Wine.findWineByNamePaged({ name, page, perPage });

    let isNone = false;
    if (!wines.length) {
      isNone = true;
      return { isNone, wines, totalPage };
    }
    for (let i = 0; i < wines.length; i++) {
      const wine = wines[i];
      const wineId = wine.id;

      const { ratingCnt, rating } =
        await ReviewService.getAverageRatingByWineId(wineId);

      if (wine.price == 9000000) {
        wine.price = 0;
      }
      wine["ratingCnt"] = ratingCnt;
      wine["rating"] = rating.toFixed(1);
    }

    return { isNone, wines, totalPage };
  }
}

export { SearchService };
