import { Comment } from "@project/shared/app-types";

export class CommentEntity implements Comment {
    //id: number;
    text: string;
    postID: number;
    userID: string;
    //createdAt: string;

  constructor(comment: Comment) {
    //this.id = comment.id;
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
    //this.createdAt = comment.createdAt;
  }

  public toObject() {
    return { ...this };
  }

}