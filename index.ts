import "dotenv/config";
import * as back4app from "./src/config/back4app";
import { InvalidBoxTypeError } from "./src/errors/invalid-box-type";
import { NoToyosError } from "./src/errors/no-toyos";
import Box from "./src/models/box/box";

import { Raffler } from "./src/raffle/raffle";
import { BoxRepository } from "./src/repositories/box.repository";
import { MetadataRepository } from "./src/repositories/metadata.repository";
import { ToyoRepository } from "./src/repositories/toyo.repository";
import { ToyoService } from "./src/services";
import { Crypt } from "./src/utils/crypt/crypt";
import { PseudoRandom } from "./src/utils/random/pseudo-random";

back4app.config();

const crypt = new Crypt();
const toyoService = new ToyoService();
const boxRepository = new BoxRepository();
const metadataRepository = new MetadataRepository();
const toyoRepository = new ToyoRepository();

const updateMetadata = async (box: Box) => {
    let { toyo, toyoParseObj } = await toyoService.getToyo(box.toyoHash);

    let fullStats = await toyoService.getFullStats(toyo.parts);

    let level: number = await toyoService.getToyoLevel(toyo.parts);

    let toyoMetadata = await metadataRepository.generateMetadata(
        toyo.toyoPersonaOrigin,
        fullStats,
        level
    );

    metadataRepository.save(box.toyoHash, toyoMetadata);

    //Save Toyo
    toyoParseObj.set("toyoMetadata", toyoMetadata);
    await toyoParseObj.save();

    //Save Box
    box = await boxRepository.saveToyo(box, toyoParseObj);

    console.log(`box: ${box.id} hash: ${box.toyoHash}`);
    return box;
};

const main = async () => {
    let boxes = await boxRepository.findClosedBoxes();
    console.log("Quantidade de Caixas: " + boxes.length + "\n");
    let nAssignedBoxes = 0;
    for (let box of boxes) {
        try {
            box = await updateMetadata(box);
            const completedPercentage = (++nAssignedBoxes / boxes.length) * 100;
            console.log(completedPercentage.toFixed(2) + "% \n");
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
