import { ToyoEdition } from "./edition";

export class ToyoPersona {
  objectId: string;
  name: string;
  edition: ToyoEdition;

  constructor(attrs: { objectId: string; name: string; edition: ToyoEdition }) {
    this.objectId = attrs.objectId;
    this.name = attrs.name;
    this.edition = attrs.edition;
  }
}
