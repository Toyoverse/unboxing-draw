import * as Parse from "parse/node";
import Box from "../models/box/box";

export class BoxRepository {
  ParseCls = Parse.Object.extend("Boxes", Box);

  async save(box: Box): Promise<Box> {
    let parseBox: Parse.Object<Parse.Attributes> = new this.ParseCls();
    parseBox.set("objectId", box.id);
    parseBox.set("toyoHash", box.toyoHash);
    parseBox.set("isOpen", box.isOpen);
    parseBox = await parseBox.save();
    return this.toModel(parseBox);
  }

  async findById(id: string): Promise<Box> {
    const boxesQuery = new Parse.Query(this.ParseCls);
    boxesQuery.equalTo("objectId", id);

    const result = await boxesQuery.first();
    if (result) {
      return this.toModel(result);
    }

    throw Error("Object not found with id " + id);
  }

  async findClosedBoxes(): Promise<Box[]> {
    const boxesQuery = new Parse.Query(this.ParseCls);
    boxesQuery.equalTo("isOpen", false);

    const result = await boxesQuery.findAll();
    return result.map((item) => {
      return this.toModel(item);
    });
  }

  toModel(parseObject: Parse.Object<Parse.Attributes>): Box {
    return new Box({
      id: parseObject.id,
      toyoHash: parseObject.get("toyoHash"),
      typeId: parseObject.get("typeId"),
      tokenId: parseObject.get("tokenId"),
      isOpen: parseObject.get("isOpen"),
    });
  }
}
