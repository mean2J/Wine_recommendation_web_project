import {Stat} from "../db/index.js";

class StatService {

  static async getStatById(statId) {
    const stat = await Stat.findStatByStatId({statId});
    return stat; 
  }

  static async getStatList() {
    const statList = await Stat.findAllStat();
    return statList;
  }

}

export {StatService};