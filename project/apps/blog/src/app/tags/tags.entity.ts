import { Tag } from "@project/shared/app-types";

export class TagEntity implements Tag {

  public id: number;
  public title: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.title = tag.title;
  }

  public toObject() {
    return { ...this };
  }

}