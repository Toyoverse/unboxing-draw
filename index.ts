import "dotenv/config";
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

back4app.config();

const random = new PseudoRandom();
const raffler = new Raffler(random);
const boxRepository = new BoxRepository();
const toyoRepository = new ToyoRepository();
const metadataRepository = new MetadataRepository();

const crypt = new Crypt();

const assignToyo = async (box: Box) => {
    let toyo = await raffler.raffle(box.typeId);
    toyo = await toyoRepository.save(toyo);

    const privateKey = process.env.PRIVATE_KEY_HASHBOX;
    const toyoHash = crypt.encrypt(toyo.objectId, privateKey);

    metadataRepository.save(toyoHash, toyo.toyoMetadata);

    box.toyoHash = toyoHash;
    box = await boxRepository.save(box);
    console.log(
        `box: ${box.id} toyoId: ${toyo.objectId} hash: ${box.toyoHash}`
    );

    return box;
};

const main = async () => {
    let boxes = await boxRepository.findClosedBoxes();

    let nAssignedBoxes = 0;
    for (let box of boxes) {
        try {
            box = await assignToyo(box);
            const completedPercentage = (++nAssignedBoxes / boxes.length) * 100;
            console.log(completedPercentage.toFixed(2) + "%");
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

// const main = () => {
//   const toyoId = "01wecM9g39";
//   const key = process.env.PRIVATE_KEY_HASHBOX;

//   const cypher = crypt.encrypt(toyoId, key);
//   console.log(cypher);
// };

main();
