import {StatModel} from "../schemas/stat.js";

class Stat {

/**
 * statId로 분석결과 확인
 */
  static async findStatByStatId({statId}) {
    const stat = await StatModel.findOne({id:statId});
    return stat;
  }

/**
 * 모든 분석리스트 확인
 */
  static async findAllStat() {
    const statList = await StatModel.find({});
    return statList;
  }

}


export {Stat};
