import { atom } from "recoil";

export const currentAtom = atom({
  key: "current",
  default: 0,
});

export const priceAtom = atom({
  key: "price",
  default: [0, 50000],
});

export const nationAtom = atom({
  key: "nation",
  default: "",
});

export const typeAtom = atom({
  key: "type",
  default: "",
});

export const sweetAtom = atom({
  key: "sweet",
  default: [1, 2],
});

export const acidityAtom = atom({
  key: "acidity",
  default: [1, 2],
});

export const bodyAtom = atom({
  key: "body",
  default: [1, 2],
});

export const tanninAtom = atom({
  key: "tannin",
  default: [1, 2],
});

export const isCheckedAtom = atom({
  key: "isChecked",
  default: false,
});

export const isLoadedAtom = atom({
  key: "isLoaded",
  default: false,
});

export const resultAtom = atom({
  key: "result",
  default: {},
});
