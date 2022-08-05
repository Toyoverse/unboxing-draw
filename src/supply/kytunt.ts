import { ToyoEdition, ToyoPersona } from "../models/toyo";

const tatsu = new ToyoPersona({
  objectId: "G2FNb70T2m",
  name: "Tatsu",
  edition: ToyoEdition.COMMON,
});
const nyima = new ToyoPersona({
  objectId: "WYWZmbfFuE",
  name: "Nyima",
  edition: ToyoEdition.UNCOMMON,
});
const mingYue = new ToyoPersona({
  objectId: "y4As33SlBa",
  name: "Ming Yue",
  edition: ToyoEdition.RARE,
});
const datu = new ToyoPersona({
  objectId: "D3dJyO5NVE",
  name: "Datu",
  edition: ToyoEdition.RARE,
});
const wangHu = new ToyoPersona({
  objectId: "gx1tCZCKir",
  name: "Wang Hu",
  edition: ToyoEdition.LIMITED,
});
const mizuchi = new ToyoPersona({
  objectId: "iGI0z7RIBI",
  name: "Mizuchi",
  edition: ToyoEdition.COLLECTORS,
});
const haruko = new ToyoPersona({
  objectId: "VJp4xfNJ4A",
  name: "Haruko",
  edition: ToyoEdition.PROTOTYPE,
});

export const kytuntBoxDistribution = new Map<ToyoPersona, number>([
  [tatsu, 476],
  [nyima, 293],
  [mingYue, 46],
  [datu, 46],
  [wangHu, 37],
  [mizuchi, 14],
  [haruko, 4],
]);

export const kytuntFortifiedBoxDistribution = new Map<ToyoPersona, number>([
  [tatsu, 0],
  [nyima, 0],
  [mingYue, 258],
  [datu, 258],
  [wangHu, 144],
  [mizuchi, 39],
  [haruko, 18],
]);
