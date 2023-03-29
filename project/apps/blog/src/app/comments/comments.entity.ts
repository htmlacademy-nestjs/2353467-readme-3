import { Comment } from "@project/shared/app-types";

export class CommentEntity implements Comment {
    _id: string;
    text: string;
    postID: string;
    userID: string;
    createdDate: number;

  constructor(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
    this.createdDate = comment.createdDate;
  }

  public toObject() {
    return { ...this };
  }

}