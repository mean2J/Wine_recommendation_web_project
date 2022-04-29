import {Router} from "express";
import {statService} from "../services/statService.js";

const statRouter = Router();

/*
 * n번(id) 분석결과 조회
 */
statRouter.get("/stat/:id", async (req, res, next) => {
    try {
  
      const statId = req.params.id;
      const stat = await statService.getStatById(statId);
  
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

    const statList = await statService.getStatList();

    res.status(200).json(statList);
  } catch (error) {
    next(error);
  }
});

export {statRouter};