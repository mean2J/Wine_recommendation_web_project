import { Router } from "express";
import { WineService } from "../services/WineService.js";

const wineRouter = Router();

//wine추천
wineRouter.get("/wines/recommend", async (req, res, next) => {
  try {
    const { nation, type, sweet, acidity, body, tannin, price } = req.body;
    const wines = await WineService.getRecommendedWine({
      nation,
      type,
      sweet,
      acidity,
      body,
      tannin,
      price,
    });

    if (wines.errorMessage) {
      throw new Error(wines.errorMessage);
    }

    res.status(200).json(wines);
  } catch (e) {
    next(e);
  }
});

//wine id로 특정 와인 찾기
wineRouter.get("/wine/:id", async (req, res, next) => {
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
