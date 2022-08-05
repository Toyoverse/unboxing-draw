import { parse } from "dotenv";
import * as Parse from "parse/node";
import { Toyo, ToyoPersona } from "../models/toyo";
import { ToyoPart } from "../models/toyo/part";

export class ToyoRepository {
  async save(toyo: Toyo): Promise<Toyo> {
    const ParseToyo = Parse.Object.extend("Toyo", Toyo);

    let parseToyo: Parse.Object<Parse.Attributes> = new ParseToyo();
    parseToyo.set("name", toyo.name);
    parseToyo.set("isToyoSelected", toyo.isToyoSelected);
    parseToyo.set("hasTenParts", toyo.hasTenParts);

    await this._setPersona(parseToyo, toyo.toyoPersonaOrigin);
    await this._setParts(
      parseToyo,
      parseToyo.get("toyoPersonaOrigin"),
      toyo.parts
    );

    const metadata = this.generateMetadata(parseToyo.get("toyoPersonaOrigin"));
    parseToyo.set("toyoMetadata", metadata);

    parseToyo = await parseToyo.save();

    toyo.objectId = parseToyo.id;
    toyo.toyoMetadata = metadata;

    return toyo;
  }

  private async _setPersona(
    parent: Parse.Object<Parse.Attributes>,
    persona: ToyoPersona
  ) {
    const query = new Parse.Query("ToyoPersona");
    query.equalTo("objectId", persona.objectId);
    const parserPersona = await query.first();
    parent.set("toyoPersonaOrigin", parserPersona);
  }

  private async _setParts(
    parent: Parse.Object<Parse.Attributes>,
    persona: Parse.Object<Parse.Attributes>,
    parts: ToyoPart[]
  ) {
    const ParseToyoPart = Parse.Object.extend("ToyoParts", ToyoPart);

    let relation = parent.relation("parts");

    for (let part of parts) {
      let parseToyoPart: Parse.Object<Parse.Attributes> = new ParseToyoPart();
      parseToyoPart.set("toyoPiece", part.toyoPiece);
      parseToyoPart.set("toyoTechnoalloy", part.toyoTechnoalloy);
      parseToyoPart.set("toyoPersona", persona);
      parseToyoPart = await parseToyoPart.save();
      relation.add(parseToyoPart);
    }
  }

  private generateMetadata(toyoPersona: Parse.Object<Parse.Attributes>) {
    return {
      name: toyoPersona.get("name"),
      description: toyoPersona.get("description"),
      image: toyoPersona.get("thumbnail"),
      animation_url: toyoPersona.get("video"),
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
          value: toyoPersona.get("region"),
        },
        {
          trait_type: "Rarity",
          value: toyoPersona.get("rarity"),
        },
        {
          display_type: "number",
          trait_type: "Vitality",
          value: 32,
        },
        {
          display_type: "number",
          trait_type: "Strength",
          value: 39,
        },
        {
          display_type: "number",
          trait_type: "Resistance",
          value: 59,
        },
        {
          display_type: "number",
          trait_type: "CyberForce",
          value: 32,
        },
        {
          display_type: "number",
          trait_type: "Resilience",
          value: 78,
        },
        {
          display_type: "number",
          trait_type: "Precision",
          value: 25,
        },
        {
          display_type: "number",
          trait_type: "Technique",
          value: 65,
        },
        {
          display_type: "number",
          trait_type: "Analysis",
          value: 109,
        },
        {
          display_type: "number",
          trait_type: "Speed",
          value: 110,
        },
        {
          display_type: "number",
          trait_type: "Agility",
          value: 78,
        },
        {
          display_type: "number",
          trait_type: "Stamina",
          value: 115,
        },
        {
          display_type: "number",
          trait_type: "Luck",
          value: 109,
        },
      ],
    };
  }
}
