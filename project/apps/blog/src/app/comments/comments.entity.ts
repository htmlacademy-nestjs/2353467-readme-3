import dayjs from 'dayjs';
import { Comment } from "@project/shared/app-types";

export class CommentEntity implements Comment {
    _id: string;
    text: string;
    postID: string;
    userID: string;
    createdAt: number;

  constructor(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
    this.createdAt = comment.createdAt;
  }

  public toObject() {
    return { ...this };
  }

  public setCreateDate() {
    this.createdAt = dayjs().unix();
    return this;
  }

}