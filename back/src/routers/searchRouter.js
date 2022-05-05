import { Router } from "express";
import { SearchService } from "../services/searchService.js";

const searchRouter = Router();

//wine 이름 검색 기능 (pagination 적용)
searchRouter.get("/search/wines", async (req, res, next) => {
  try {
    const name = req.query.text;
    const page = req.query.page;
    const perPage = req.query.perPage;

    const { isNone, wines, totalPage } = await SearchService.getWineByNamePaged(
      {
        name,
        page,
        perPage,
      }
    );

    if (wines.errorMessage) {
      throw new Error(wines.errorMessage);
    }
    const body = {
      success: true,
      totalPage: totalPage,
      page: page,
      isNone: isNone,
      wines: wines,
    };
    res.status(200).json(body);
  } catch (e) {
    next(e);
  }
});

export { searchRouter };
