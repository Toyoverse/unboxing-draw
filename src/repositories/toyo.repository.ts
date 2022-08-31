import { parse } from "dotenv";
import * as Parse from "parse/node";
import { Toyo, ToyoPersona } from "../models/toyo";
import { ToyoPart } from "../models/toyo/part";

export class ToyoRepository {
    async save(toyo: Toyo): Promise<Toyo> {
        const ParseToyo = Parse.Object.extend("Toyo", Toyo);

        let parseToyo: Parse.Object<Parse.Attributes> = new ParseToyo();

        const parserPersona = await this._setPersona(toyo.toyoPersonaOrigin);
        toyo.toyoPersonaOrigin = parserPersona;
        const relationParts = await this._setParts(toyo.parts, parserPersona);
        delete toyo.parts;
        const partsRelationToPlayer = parseToyo.relation("parts");
        partsRelationToPlayer.add(relationParts);

        parseToyo = await parseToyo.save(toyo);

        toyo.objectId = parseToyo.id;

        return toyo;
    }

    async findToyoById(
        id: string
    ): Promise<{ toyo: Toyo; toyoParseObj: Parse.Object }> {
        const ParseToyo = Parse.Object.extend("Toyo", Toyo);
        const query = new Parse.Query(ParseToyo);
        query.equalTo("objectId", id);
        query.include("toyoPersonaOrigin");
        const result: any = await query.first();
        if (result) {
            const toyo: Toyo = new Toyo(result.toJSON());
            const parts = await result.relation("parts").query().findAll();
            toyo.parts = parts;
            return { toyo, toyoParseObj: result };
        }

        throw Error("Object not found with id " + id);
    }

    private async _setPersona(persona: ToyoPersona): Promise<any> {
        const query = new Parse.Query("ToyoPersona");
        query.equalTo("objectId", persona.objectId);
        const parserPersona = await query.first();
        return parserPersona;
    }

    private async _setParts(parts?: ToyoPart[], parserPersona?: any) {
        const ParseToyoPart = Parse.Object.extend("ToyoParts", ToyoPart);

        let relation = [];

        if (parts) {
            for (let part of parts) {
                let parseToyoPart: Parse.Object<Parse.Attributes> =
                    new ParseToyoPart();
                part.toyoPersona = parserPersona;
                parseToyoPart = await parseToyoPart.save(part);
                relation.push(parseToyoPart);
            }
        }

        return relation;
    }
}
