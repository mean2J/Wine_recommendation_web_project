import {Router} from "express";
import {StatService} from "../services/statService.js";

const statRouter = Router();

/*
 * n번(id) 분석결과 조회
 */
statRouter.get("/stat/:id", async (req, res, next) => {
    try {
  
      const statId = req.params.id;
      const stat = await StatService.getStatById(statId);
  
      res.status(200).json(stat);
    } catch (error) {
      next(error);
    }
  });


/*
 * 분석결과 리스트 조회
 */
statRouter.get("/statlist", async (req, res, next) => {
  try {

    const statList = await StatService.getStatList();

    res.status(200).json(statList);
  } catch (error) {
    next(error);
  }
});

export {statRouter};