import { ToyoEdition } from "./edition";

export class ToyoPersona {
    objectId: string;
    name: string;
    edition: ToyoEdition;
    description?: string;
    thumbnail?: string;
    video?: string;
    region?: string;

    constructor(attrs: {
        objectId: string;
        name: string;
        edition: ToyoEdition;
        description?: string;
        thumbnail?: string;
        video?: string;
        region?: string;
    }) {
        this.objectId = attrs.objectId;
        this.name = attrs.name;
        this.edition = attrs.edition;
        this.description = attrs.description;
        this.thumbnail = attrs.thumbnail;
        this.video = attrs.video;
        this.region = attrs.region;
    }
}
