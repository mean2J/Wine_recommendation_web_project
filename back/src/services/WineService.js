import { Wine } from "../db/index.js";

class WineService {
  //wine추천
  static async getRecommendedWine({
    nation,
    type,
    sweet,
    acidity,
    body,
    tannin,
    price,
    isChecked,
  }) {
    //(sweet, acidity, body, tannin), price -> ex) 1이상 3이하 [1, 3]
    const wines = await Wine.findRecommendedWine({
      nation,
      type,
      sweetGte: sweet[0],
      sweetLte: sweet[1],
      acidityGte: acidity[0],
      acidityLte: acidity[1],
      bodyGte: body[0],
      bodyLte: body[1],
      tanninGte: tannin[0],
      tanninLte: tannin[1],
      priceGte: price[0],
      priceLte: price[1],
    });

    //wines의 값이 5개 이상이라면 5개만 랜덤하게 추출
    let wineList = [];
    if (wines.length > 5) {
      while (wineList.length != 5) {
        let wine = wines.splice(Math.floor(Math.random() * wines.length), 1)[0];
        wineList.push(wine);
      }
    }

    //isChecked -> true 정보없음 포함
    if (isChecked) {
      const winesWithoutPrice = await Wine.findWineWithoutPrice({
        nation,
        type,
        sweetGte: sweet[0],
        sweetLte: sweet[1],
        acidityGte: acidity[0],
        acidityLte: acidity[1],
        bodyGte: body[0],
        bodyLte: body[1],
        tanninGte: tannin[0],
        tanninLte: tannin[1],
        price: 0,
      });

      let wineWithoutPriceList = [];
      if (winesWithoutPrice.length > 3) {
        while (wineWithoutPriceList.length != 3) {
          let wine = winesWithoutPrice.splice(
            Math.floor(Math.random() * winesWithoutPrice.length),
            1
          )[0];
          wineWithoutPriceList.push(wine);
        }
      }
      wineList.push(wineWithoutPriceList);
    }

    //추천된 와인들
    return wineList;
  }

  //wine id로 특정 와인 찾기
  static async getWineById({ id }) {
    const wine = await Wine.findWineById(id);

    const {
      name,
      nation,
      local,
      varieties,
      type,
      abv,
      sweet,
      acidity,
      body,
      tannin,
      price,
    } = wine;

    const findedWine = {
      name,
      nation,
      local,
      varieties,
      type,
      abv,
      sweet,
      acidity,
      body,
      tannin,
      price,
    };

    return findedWine;
  }
}

export { WineService };
