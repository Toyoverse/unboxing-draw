import Box from "../models/box/box";
import { ToyoEdition, ToyoPersona } from "../models/toyo";

const slicky = new ToyoPersona({
  objectId: "Y2GJfBO1cl",
  name: "Slicky",
  edition: ToyoEdition.COMMON,
});
const donBarko = new ToyoPersona({
  objectId: "R8xYTwz4xl",
  name: "Don Barko",
  edition: ToyoEdition.UNCOMMON,
});
const bikEy3z = new ToyoPersona({
  objectId: "g2muNnKVuS",
  name: "BikEy3z",
  edition: ToyoEdition.RARE,
});
const gaja = new ToyoPersona({
  objectId: "FmPLbQ2V0j",
  name: "Gaja",
  edition: ToyoEdition.RARE,
});
const rocker = new ToyoPersona({
  objectId: "K2XCt2Lq7w",
  name: "Rocker",
  edition: ToyoEdition.RARE,
});
const uzi = new ToyoPersona({
  objectId: "kv1WiNDAuD",
  name: "Uzi",
  edition: ToyoEdition.LIMITED,
});
const yawara = new ToyoPersona({
  objectId: "5jKCjYWKtY",
  name: "Yawara",
  edition: ToyoEdition.LIMITED,
});
const ribbit = new ToyoPersona({
  objectId: "Fq5HNieozz",
  name: "Ribbit",
  edition: ToyoEdition.COLLECTORS,
});
const laoQing = new ToyoPersona({
  objectId: "HdE75KYLEu",
  name: "Lao Qing",
  edition: ToyoEdition.COLLECTORS,
});
const doge = new ToyoPersona({
  objectId: "SlVD8e6onM",
  name: "Doge",
  edition: ToyoEdition.PROTOTYPE,
});

export const jakanaBoxDistribution = new Map<ToyoPersona, number>([
  [slicky, 237],
  [donBarko, 162],
  [bikEy3z, 16],
  [gaja, 16],
  [rocker, 16],
  [uzi, 9],
  [yawara, 9],
  [ribbit, 4],
  [laoQing, 4],
  [doge, 1],
]);

export const jakanaFortifiedBoxDistribution = new Map<ToyoPersona, number>([
  [slicky, 0],
  [donBarko, 0],
  [bikEy3z, 89],
  [gaja, 89],
  [rocker, 89],
  [uzi, 38],
  [yawara, 38],
  [ribbit, 13],
  [laoQing, 13],
  [doge, 13],
]);

let total = 0;
for (let value of jakanaBoxDistribution.values()) {
  total += value;
}
