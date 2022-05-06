import { WineModel } from "../schemas/wine.js";

class Wine {
  //wine추천
  static async findRecommendedWine({
    nation,
    type,
    sweetGte,
    sweetLte,
    acidityGte,
    acidityLte,
    bodyGte,
    bodyLte,
    tanninGte,
    tanninLte,
    priceGte,
    priceLte,
  }) {
    const wines = await WineModel.find({
      $and: [
        { nation },
        { type },
        { sweet: { $gte: sweetGte, $lte: sweetLte } },
        { acidity: { $gte: acidityGte, $lte: acidityLte } },
        { body: { $gte: bodyGte, $lte: bodyLte } },
        { tannin: { $gte: tanninGte, $lte: tanninLte } },
        { price: { $gte: priceGte, $lte: priceLte } },
      ],
    });
    return wines;
  }

  //가격 정보 없음 wine 찾기
  static async findWineWithoutPrice({
    nation,
    type,
    sweetGte,
    sweetLte,
    acidityGte,
    acidityLte,
    bodyGte,
    bodyLte,
    tanninGte,
    tanninLte,
    price,
  }) {
    const wines = await WineModel.find({
      $and: [
        { nation },
        { type },
        { sweet: { $gte: sweetGte, $lte: sweetLte } },
        { acidity: { $gte: acidityGte, $lte: acidityLte } },
        { body: { $gte: bodyGte, $lte: bodyLte } },
        { tannin: { $gte: tanninGte, $lte: tanninLte } },
        { price },
      ],
    });
    return wines;
  }

  //wine 국가, type으로만 추천
  static async findRecommendedWineLeast({ nation, type }) {
    const wines = await WineModel.find({
      $and: [{ nation }, { type }],
    });
    return wines;
  }

  //wine id로 특정 와인 찾기
  static async findWineById(id) {
    const wine = await WineModel.findOne({ id }).lean();
    return wine;
  }

  static async exists(filter) {
    const itExists = await WineModel.exists(filter);
    return itExists;
  }
  //wine 이름 검색 기능 (전체 리스트)
  static async findWineByName(name) {
    const wines = await WineModel.find({
      name: { $regex: name, $options: "i" },
    });
    return wines;
  }

  //wine 이름 검색 기능 (pagination 적용)
  static async findWineByNamePaged({ name, page, perPage }) {
    const wines = await WineModel.find({
      name: { $regex: name, $options: "i" },
    })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return wines;
  }
}

export { Wine };
