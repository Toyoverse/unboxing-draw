import * as path from "path";
import * as fs from "fs";
import { Toyo, ToyoPersona } from "src/models/toyo";

export class MetadataRepository {
    private folder: string;
    constructor() {
        this.folder = process.env.LOCAL_FILES_FOLDER || "./files";
    }

    async generateMetadata(
        toyoPersona: ToyoPersona,
        toyoStats: Record<string, number>,
        toyoLevel: number
    ) {
        return {
            name: toyoPersona.name,
            description: toyoPersona.description,
            image: toyoPersona.thumbnail,
            animation_url: toyoPersona.video,
            attributes: [
                {
                    trait_type: "Type",
                    value: toyoLevel,
                },
                {
                    trait_type: "Toyo",
                    value: toyoPersona.name,
                },
                {
                    trait_type: "Region",
                    value: toyoPersona.region,
                },
                {
                    trait_type: "Rarity",
                    value: toyoPersona.rarity,
                },
                {
                    display_type: "number",
                    trait_type: "Vitality",
                    value: toyoStats.vitality,
                },
                {
                    display_type: "number",
                    trait_type: "Strength",
                    value: toyoStats.physicalStrength,
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

    async save(filename: string, metadata: object) {
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder);
        }

        const filePath = path.join(this.folder, filename + ".json");
        const json = JSON.stringify(metadata, null, 2);
        fs.writeFileSync(filePath, json, "utf-8");
    }
}
