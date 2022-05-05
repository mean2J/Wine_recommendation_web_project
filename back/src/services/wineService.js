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
    const sweetGte = sweet[0];
    const sweetLte = sweet[1];
    const acidityGte = acidity[0];
    const acidityLte = acidity[1];
    const bodyGte = body[0];
    const bodyLte = body[1];
    const tanninGte = tannin[0];
    const tanninLte = tannin[1];
    const priceGte = price[0];
    const priceLte = price[1];

    //wines -> 가격 정보 없음 포함하지 않는 추천 리스트
    const wineList = await Wine.findRecommendedWine({
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

    //5개만 랜덤하게 추출
    let wines = [];
    if (wineList.length > 5) {
      for (let i = 0; i < 5; i++) {
        const wine = wineList.splice(
          Math.floor(Math.random() * wineList.length),
          1
        )[0];
        wines.push(wine);
      }
    } else {
      wines.concat(wineList);
    }

    //winesWithoutPrice -> 가격 정보 없음을 포함하는 경우 (가격 정보 없는 와인 3개 추가)
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
        price: 9000000,
      });
      //3개만 랜덤하게 추출
      if (winesWithoutPrice.length > 3) {
        for (let i = 0; i < 3; i++) {
          const wine = winesWithoutPrice.splice(
            Math.floor(Math.random() * winesWithoutPrice.length),
            1
          )[0];
          wine.price = 0;
          wines.push(wine);
        }
      } else {
        wines.concat(winesWithoutPrice);
      }
    }

    //wineList에 아무값도 들어오지 못한 경우, nation과 type만으로 추천 리스트 생성
    let isRandom = false;
    if (wines.length == 0) {
      isRandom = true;
      const leastWines = await Wine.findRecommendedWineLeast({
        nation,
        type,
      });

      if (leastWines.length > 5) {
        for (let i = 0; i < 5; i++) {
          const wine = leastWines.splice(
            Math.floor(Math.random() * leastWines.length),
            1
          )[0];
          if (wine.price == 9000000) {
            wine.price = 0;
          }
          wines.push(wine);
        }
      } else {
        wines.concat(leastWines);
      }
    }
    return { wines, isRandom };
  }

  //wine id로 특정 와인 찾기
  static async getWineById({ id }) {
    const wine = await Wine.findWineById(id);

    return wine;
  } 
}

export { WineService };
