import { Tag } from "@project/shared/app-types";

export class TagEntity implements Tag {

  public _id: string;
  public title: string;

  constructor(tag: Tag) {
    this._id = tag._id;
    this.title = tag.title;
  }

  public toObject() {
    return { ...this };
  }

}