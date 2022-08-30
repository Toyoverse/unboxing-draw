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
  [tatsu, 1],
  [nyima, 0],
  [mingYue, 0],
  [datu, 0],
  [wangHu, 0],
  [mizuchi, 0],
  [haruko, 0],
]);

export const kytuntFortifiedBoxDistribution = new Map<ToyoPersona, number>([
  [tatsu, 0],
  [nyima, 0],
  [mingYue, 0],
  [datu, 0],
  [wangHu, 0],
  [mizuchi, 0],
  [haruko, 0],
]);
