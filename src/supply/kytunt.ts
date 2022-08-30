import { ToyoEdition, ToyoPersona } from "../models/toyo";

const tatsu = new ToyoPersona({
  objectId: "MeQgZKuDiY",
  name: "Tatsu",
  edition: ToyoEdition.COMMON,
});
const nyima = new ToyoPersona({
  objectId: "3LB0Yvmo52",
  name: "Nyima",
  edition: ToyoEdition.UNCOMMON,
});
const mingYue = new ToyoPersona({
  objectId: "ElHd8iCGHx",
  name: "Ming Yue",
  edition: ToyoEdition.RARE,
});
const datu = new ToyoPersona({
  objectId: "vIkVXvE2vO",
  name: "Datu",
  edition: ToyoEdition.RARE,
});
const wangHu = new ToyoPersona({
  objectId: "exxpgu35Kn",
  name: "Wang Hu",
  edition: ToyoEdition.LIMITED,
});
const mizuchi = new ToyoPersona({
  objectId: "XFtzfuUqH2",
  name: "Mizuchi",
  edition: ToyoEdition.COLLECTORS,
});
const haruko = new ToyoPersona({
  objectId: "PnM1ENPEBA",
  name: "Haruko",
  edition: ToyoEdition.PROTOTYPE,
});

export const kytuntBoxDistribution = new Map<ToyoPersona, number>([
  [tatsu, 225],
  [nyima, 169],
  [mingYue, 7],
  [datu, 21],
  [wangHu, 19],
  [mizuchi, 8],
  [haruko, 0],
]);

export const kytuntFortifiedBoxDistribution = new Map<ToyoPersona, number>([
  [tatsu, 0],
  [nyima, 0],
  [mingYue, 57],
  [datu, 57],
  [wangHu, 46],
  [mizuchi, 8],
  [haruko, 1],
]);
