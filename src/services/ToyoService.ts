import { Toyo } from "src/models/toyo";
import { ToyoRepository } from "../repositories/toyo.repository";
import { Crypt } from ".././utils/crypt/crypt";
import { ToyoPart } from "src/models/toyo/part";

const crypt = new Crypt();
const toyoRepository = new ToyoRepository();

export class ToyoService {
    private privateKey: string;
    constructor() {
        this.privateKey = process.env.PRIVATE_KEY_HASHBOX;
    }

    async getToyo(
        toyoHash: string
    ): Promise<{ toyo: Toyo; toyoParseObj: Parse.Object }> {
        const toyoId = crypt.decrypt(toyoHash, this.privateKey);
        console.log("toyoId: " + toyoId);
        return await toyoRepository.findToyoById(toyoId);
    }

    async getFullStats(parts: any[]): Promise<any> {
        const allPartsStats: Record<string, number> = {
            vitality: 0,
            resistance: 0,
            resilience: 0,
            physicalStrength: 0,
            cyberForce: 0,
            technique: 0,
            analysis: 0,
            agility: 0,
            speed: 0,
            precision: 0,
            stamina: 0,
            luck: 0,
        };
        for (let part of parts) {
            const partStats = part.get("stats");
            for (let stat in partStats) {
                allPartsStats[stat] += partStats[stat];
            }
        }
        allPartsStats.heartbond = 20;
        return allPartsStats;
    }

    async getToyoLevel(parts: any[]): Promise<number> {
        const levels: any = parts.map((part) => part.get("level"));
        const maxLevel: number | undefined = Math.max(...levels);
        return maxLevel;
    }
}
