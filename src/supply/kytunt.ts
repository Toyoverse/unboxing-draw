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
    edition: ToyoEdition.COLLECTOR,
});
const haruko = new ToyoPersona({
    objectId: "PnM1ENPEBA",
    name: "Haruko",
    edition: ToyoEdition.PROTOTYPE,
});

export const kytuntBoxDistribution = new Map<ToyoPersona, number>([
    [tatsu, 56],
    [nyima, 34],
    [mingYue, 5],
    [datu, 5],
    [wangHu, 4],
    [mizuchi, 1],
    [haruko, 1],
]);

export const kytuntFortifiedBoxDistribution = new Map<ToyoPersona, number>([
    [tatsu, 0],
    [nyima, 0],
    [mingYue, 11],
    [datu, 10],
    [wangHu, 6],
    [mizuchi, 2],
    [haruko, 1],
]);
