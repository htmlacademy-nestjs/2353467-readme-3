import { Like } from "@project/shared/app-types";

export class LikeEntity implements Like {
    _id: string;
    postID: string;
    userID: string;

  constructor(like: Like) {
    this._id = like._id;
    this.postID = like.postID;
    this.userID = like.userID;
  }

  public toObject() {
    return { ...this };
  }

}