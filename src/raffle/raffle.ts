import { InvalidBoxTypeError } from "../errors/invalid-box-type";
import { NoToyosError } from "../errors/no-toyos";
import { BoxType } from "../models/box/types";
import { Toyo, ToyoEdition, ToyoPersona } from "../models/toyo";
import { ToyoPart } from "../models/toyo/part";
import { ToyoPiece } from "../models/toyo/piece";
import {
    jakanaBoxDistribution,
    jakanaFortifiedBoxDistribution,
} from "../supply/jakana";
import {
    kytuntBoxDistribution,
    kytuntFortifiedBoxDistribution,
} from "../supply/kytunt";
import { Random } from "../utils/random/random";

export class Raffler {
    constructor(private _random: Random) {}

    raffle(boxType: BoxType): Toyo {
        switch (boxType) {
            case BoxType.JAKANA:
                return this._raffle(BoxType.JAKANA, jakanaBoxDistribution);
            case BoxType.JAKANA_FORTIFIED:
                return this._raffle(
                    BoxType.JAKANA_FORTIFIED,
                    jakanaFortifiedBoxDistribution
                );
            case BoxType.KYTUNT:
                return this._raffle(BoxType.KYTUNT, kytuntBoxDistribution);
            case BoxType.KYTUNT_FORTIFIED:
                return this._raffle(
                    BoxType.KYTUNT_FORTIFIED,
                    kytuntFortifiedBoxDistribution
                );
            default:
                throw new InvalidBoxTypeError(
                    "Type not handled by raffle" + boxType
                );
        }
    }

    private _raffle(
        type: BoxType,
        distribution: Map<ToyoPersona, number>
    ): Toyo {
        let length = 0;
        for (let value of distribution.values()) {
            length += value;
        }

        const position = this._random.rand(length);
        let accumulator = 0;

        for (let entry of distribution.entries()) {
            const toyoPersona = entry[0];
            const value = entry[1];

            if (position >= accumulator && position < accumulator + value) {
                distribution.set(toyoPersona, value - 1);
                return this._buildToyo(toyoPersona);
            }

            accumulator += value;
        }

        throw new NoToyosError(
            "No toyos available for boxes with type " + type
        );
    }

    private _buildToyo(toyoPersona: ToyoPersona): Toyo {
        const { parts, allPartsStats, toyoLevel } = _buildParts(toyoPersona);
        return new Toyo({
            name: toyoPersona.name,
            toyoPersonaOrigin: toyoPersona,
            createdAt: new Date(),
            typeId: "9",
            isToyoSelected: false,
            hasTenParts: true,
            toyoMetadata: this.generateMetadata(
                toyoPersona,
                allPartsStats,
                parts[0]
            ),
            level: toyoLevel,
            parts: parts,
        });
    }

    private generateMetadata(
        toyoPersona: ToyoPersona,
        toyoStats: Record<string, number>,
        parts: ToyoPart
    ) {
        return {
            name: toyoPersona.name,
            description: toyoPersona.description,
            image: toyoPersona.thumbnail,
            animation_url: toyoPersona.video,
            attributes: [
                {
                    trait_type: "Type",
                    value: 9,
                },
                {
                    trait_type: "Toyo",
                    value: "Ribbit",
                },
                {
                    trait_type: "Region",
                    value: toyoPersona.region,
                },
                {
                    trait_type: "Rarity",
                    value: parts.rarity,
                },
                {
                    display_type: "number",
                    trait_type: "Vitality",
                    value: toyoStats.vitality,
                },
                {
                    display_type: "number",
                    trait_type: "Strength",
                    value: toyoStats.strength,
                },
                {
                    display_type: "number",
                    trait_type: "Resistance",
                    value: toyoStats.resistance,
                },
                {
                    display_type: "number",
                    trait_type: "CyberForce",
                    value: toyoStats.cyberForce,
                },
                {
                    display_type: "number",
                    trait_type: "Resilience",
                    value: toyoStats.resilience,
                },
                {
                    display_type: "number",
                    trait_type: "Precision",
                    value: toyoStats.precision,
                },
                {
                    display_type: "number",
                    trait_type: "Technique",
                    value: toyoStats.technique,
                },
                {
                    display_type: "number",
                    trait_type: "Analysis",
                    value: toyoStats.analysis,
                },
                {
                    display_type: "number",
                    trait_type: "Speed",
                    value: toyoStats.speed,
                },
                {
                    display_type: "number",
                    trait_type: "Agility",
                    value: toyoStats.agility,
                },
                {
                    display_type: "number",
                    trait_type: "Stamina",
                    value: toyoStats.stamina,
                },
                {
                    display_type: "number",
                    trait_type: "Luck",
                    value: toyoStats.luck,
                },
            ],
        };
    }
}

function _mapLevel(rarity: number): number {
    let levels = [];
    let index: number;
    switch (rarity) {
        case 1:
            levels = [7, 8, 9];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        case 2:
            levels = [8, 9, 10];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        case 3:
            levels = [8, 9, 10, 11];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        case 4:
            levels = [9, 10, 11];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        case 5:
            levels = [10, 11];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        case 6:
            levels = [11, 12];
            index = Math.floor(Math.random() * levels.length);
            return levels[index];
        default:
            throw new Error("Invalid rarity");
    }
}

const _mapRandomStat = (minSum: number, maxSum: number) =>
    Math.floor(Math.random() * (maxSum - minSum + 1) + minSum);

function _mapSumStats(level: number): number {
    let minSum = 0;
    let maxSum = 0;

    switch (level) {
        case 7:
            minSum = 59;
            maxSum = 68;
            break;
        case 8:
            minSum = 68;
            maxSum = 77;
            break;
        case 9:
            minSum = 77;
            maxSum = 86;
            break;
        case 10:
            minSum = 86;
            maxSum = 95;
            break;
        case 11:
            minSum = 95;
            maxSum = 103;
            break;
        case 12:
            minSum = 103;
            maxSum = 111;
            break;
        default:
            throw new Error("Invalid level");
    }

    return _mapRandomStat(minSum, maxSum);
}

function _buildParts(toyoPersona: any): {
    parts: ToyoPart[];
    toyoLevel: number;
    allPartsStats: Record<string, number>;
} {
    const parts: ToyoPart[] = [];
    const partsName = [
        "HEAD",
        "CHEST",
        "R_ARM",
        "L_ARM",
        "R_HAND",
        "L_HAND",
        "R_LEG",
        "L_LEG",
        "R_FOOT",
        "L_FOOT",
    ];
    const rarity: number = toyoPersona.edition;
    console.log("rarity", rarity);

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

    for (let index = 0; index < partsName.length; index++) {
        const level = _mapLevel(rarity);
        let sumStats = _mapSumStats(level) - 12;

        const part: any = {
            toyoPiece: partsName[index],
            toyoTechnoalloy: "SIDERITE",
            toyoPersona,
            isNFT: false,
            bonusStats: {},
            justTheStats: [
                { stat: "vitality", value: 1 },
                { stat: "resistance", value: 1 },
                { stat: "resilience", value: 1 },
                { stat: "physicalStrength", value: 1 },
                { stat: "cyberForce", value: 1 },
                { stat: "technique", value: 1 },
                { stat: "analysis", value: 1 },
                { stat: "agility", value: 1 },
                { stat: "speed", value: 1 },
                { stat: "precision", value: 1 },
                { stat: "stamina", value: 1 },
                { stat: "luck", value: 1 },
            ],
            rarityId: rarity.toString(),
            rarity: ToyoEdition[rarity],
            stats: {},
            level,
        };

        while (sumStats > 0) {
            const randomStat = Math.floor(
                Math.random() * part.justTheStats.length
            );
            part.justTheStats[randomStat].value++;
            sumStats--;
        }

        for (const justTheStat of part.justTheStats) {
            allPartsStats[justTheStat.stat] += justTheStat.value;
            part.stats[justTheStat.stat] = justTheStat.value;
        }

        delete part.justTheStats;
        part.stats["heartbond"] = 20;

        parts.push(part);
    }

    const levels: any = parts.map((part) => part.level);
    const maxLevel: number | undefined = Math.max(...levels);
    return { parts, toyoLevel: maxLevel, allPartsStats };
}
