import { ToyoPersona } from "./persona";
import { ToyoPiece } from "./piece";

export class ToyoPart {
  objectId?: string;
  bonusStats?: Object;
  toyoTechnoalloy: string;
  cards?: any[];
  createdAt?: Date;
  updatedAt?: Date;
  toyoPersona: ToyoPersona;
  toyoPiece: ToyoPiece;
  stats?: Object;

  constructor(attrs: {
    objectId?: string;
    bonusStats?: Object;
    toyoTechnoalloy: string;
    cards?: any[];
    createdAt?: Date;
    updatedAt?: Date;
    toyoPersona: ToyoPersona;
    toyoPiece: ToyoPiece;
    stats?: Object;
  }) {
    this.objectId = attrs.objectId;
    this.bonusStats = attrs.bonusStats;
    this.toyoTechnoalloy = attrs.toyoTechnoalloy;
    this.cards = attrs.cards;
    this.createdAt = attrs.createdAt;
    this.updatedAt = attrs.updatedAt;
    this.toyoPersona = attrs.toyoPersona;
    this.toyoPiece = attrs.toyoPiece;
    this.stats = attrs.stats;
  }
}
