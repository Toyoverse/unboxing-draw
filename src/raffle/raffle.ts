import { InvalidBoxTypeError } from "../errors/invalid-box-type";
import { NoToyosError } from "../errors/no-toyos";
import { BoxType } from "../models/box/types";
import { Toyo, ToyoPersona } from "../models/toyo";
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
        throw new InvalidBoxTypeError("Type not handled by raffle" + boxType);
    }
  }

  private _raffle(type: BoxType, distribution: Map<ToyoPersona, number>): Toyo {
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

    throw new NoToyosError("No toyos available for boxes with type " + type);
  }

  private _buildToyo(toyoPersona: ToyoPersona): Toyo {
    const parts = _buildParts(toyoPersona);
    return new Toyo({
      name: toyoPersona.name,
      toyoPersonaOrigin: toyoPersona,
      createdAt: new Date(),
      parts: parts,
      typeId: "9",
      isToyoSelected: false,
      hasTenParts: true,
    });
  }
}

function _buildParts(toyoPersona: ToyoPersona): ToyoPart[] {
  const parts: ToyoPart[] = [];

  const chest = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.CHEST,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(chest);

  const head = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.HEAD,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(head);

  const lArm = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.L_ARM,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(lArm);

  const lFoot = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.L_FOOT,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(lFoot);

  const lHand = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.L_HAND,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(lHand);

  const lLeg = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.L_LEG,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(lLeg);

  const rArm = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.R_ARM,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(rArm);

  const rFoot = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.R_FOOT,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(rFoot);

  const rHand = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.R_HAND,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(rHand);

  const rLeg = new ToyoPart({
    toyoPersona: toyoPersona,
    toyoPiece: ToyoPiece.R_LEG,
    toyoTechnoalloy: "SIDERITE",
    bonusStats: {},
    cards: undefined,
    createdAt: new Date(),
    updatedAt: undefined,
    stats: {},
  });

  parts.push(rLeg);

  return parts;
}
