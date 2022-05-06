import { Router } from "express";
import { WineService } from "../services/wineService.js";

const wineRouter = Router();

//wine추천
wineRouter.post("/wines/recommend", async (req, res, next) => {
  try {
    const { nation, type, sweet, acidity, body, tannin, price, isChecked } =
      req.body;

    const { wines, isRandom } = await WineService.getRecommendedWine({
      nation,
      type,
      sweet,
      acidity,
      body,
      tannin,
      price,
      isChecked,
    });

    if (wines.errorMessage) {
      throw new Error(wines.errorMessage);
    }

    const resBody = {
      success: true,
      isRandom: isRandom,
      wines: wines,
    };

    res.status(200).json(resBody);
  } catch (e) {
    next(e);
  }
});

//wine id로 특정 와인 찾기
wineRouter.get("/wines/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const wine = await WineService.getWineById({ id });

    if (wine.errorMessage) {
      throw new Error(wine.errorMessage);
    }

    res.status(200).json(wine);
  } catch (e) {
    next(e);
  }
});
export { wineRouter };
