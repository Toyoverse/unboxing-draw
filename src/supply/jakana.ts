import Box from "../models/box/box";
import { ToyoEdition, ToyoPersona } from "../models/toyo";

const slicky = new ToyoPersona({
  objectId: "2GM4Hm87Sh",
  name: "Slicky",
  edition: ToyoEdition.COMMON,
});
const donBarko = new ToyoPersona({
  objectId: "aTGA64m9nu",
  name: "Don Barko",
  edition: ToyoEdition.UNCOMMON,
});
const bikEy3z = new ToyoPersona({
  objectId: "8UlqOpXGcd",
  name: "BlkEy3z",
  edition: ToyoEdition.RARE,
});
const gaja = new ToyoPersona({
  objectId: "j7NMhaCdlX",
  name: "Gaja",
  edition: ToyoEdition.RARE,
});
const rocker = new ToyoPersona({
  objectId: "TBGTokjDDO",
  name: "Rocker",
  edition: ToyoEdition.RARE,
});
const uzi = new ToyoPersona({
  objectId: "XnpG6afMWP",
  name: "Uzi",
  edition: ToyoEdition.LIMITED,
});
const yawara = new ToyoPersona({
  objectId: "576s6pO0yz",
  name: "Yawara",
  edition: ToyoEdition.LIMITED,
});
const ribbit = new ToyoPersona({
  objectId: "3Gc2vNAUnc",
  name: "Ribbit",
  edition: ToyoEdition.COLLECTORS,
});
const laoQing = new ToyoPersona({
  objectId: "Oi4fu1aJSG",
  name: "Lao Qing",
  edition: ToyoEdition.COLLECTORS,
});
const doge = new ToyoPersona({
  objectId: "QcyQL44Zv4",
  name: "Doge",
  edition: ToyoEdition.PROTOTYPE,
});

export const jakanaBoxDistribution = new Map<ToyoPersona, number>([
  [slicky, 1896],
  [donBarko, 1437],
  [bikEy3z, 125],
  [gaja, 131],
  [rocker, 137],
  [uzi, 78],
  [yawara, 81],
  [ribbit, 31],
  [laoQing, 30],
  [doge, 20],
]);

export const jakanaFortifiedBoxDistribution = new Map<ToyoPersona, number>([
  [slicky, 0],
  [donBarko, 0],
  [bikEy3z, 37],
  [gaja, 27],
  [rocker, 26],
  [uzi, 17],
  [yawara, 18],
  [ribbit, 7],
  [laoQing, 7],
  [doge, 4],
]);
