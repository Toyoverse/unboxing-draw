import { Random } from "./random";

export class PseudoRandom implements Random {
  rand(limit: number): number {
    return Math.floor(Math.random() * limit);
  }
}
