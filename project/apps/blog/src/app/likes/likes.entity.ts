import { Like } from "@project/shared/app-types";

export class LikeEntity implements Like {
    id: number;
    postID: number;
    userID: string;

  constructor(like: Like) {
    this.id = like.id;
    this.postID = like.postID;
    this.userID = like.userID;
  }

  public toObject() {
    return { ...this };
  }

}