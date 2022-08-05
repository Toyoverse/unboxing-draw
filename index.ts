import env from "dotenv";
import * as back4app from "./src/config/back4app";
import { InvalidBoxTypeError } from "./src/errors/invalid-box-type";
import { NoToyosError } from "./src/errors/no-toyos";
import Box from "./src/models/box/box";

import { Raffler } from "./src/raffle/raffle";
import { BoxRepository } from "./src/repositories/box.repository";
import { MetadataRepository } from "./src/repositories/metadata.repository";
import { ToyoRepository } from "./src/repositories/toyo.repository";
import { Crypt } from "./src/utils/crypt/crypt";
import { PseudoRandom } from "./src/utils/random/pseudo-random";

env.config();
back4app.config();

const random = new PseudoRandom();
const raffler = new Raffler(random);
const boxRepository = new BoxRepository();
const toyoRepository = new ToyoRepository();
const metadataRepository = new MetadataRepository();

const crypt = new Crypt();

const privateKey = process.env.PRIVATE_KEY || "";

const assignToyo = async (box: Box) => {
  let toyo = raffler.raffle(box.typeId);
  toyo = await toyoRepository.save(toyo);

  const json = JSON.stringify({ id: toyo.objectId, name: toyo.name });
  const toyoHash = crypt.encrypt(json, privateKey);

  metadataRepository.save(toyoHash, toyo.toyoMetadata);

  box.toyoHash = toyoHash;
  box = await boxRepository.save(box);
  console.log(box.id);
  return box;
};

const main = async () => {
  let boxes = await boxRepository.findClosedBoxes();

  for (let box of boxes) {
    try {
      box = await assignToyo(box);
    } catch (e) {
      if (e instanceof InvalidBoxTypeError || e instanceof NoToyosError) {
        console.log(e.message);
      } else {
        throw e;
      }
    }
  }

  console.log("Finalizado");
};

main();
