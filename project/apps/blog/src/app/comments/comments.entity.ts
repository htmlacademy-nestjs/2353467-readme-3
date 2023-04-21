import { Comment } from "@project/shared/app-types";

export class CommentEntity implements Comment {
    id: number;
    text: string;
    postID: number;
    userID: string;

  constructor(comment: Comment) {
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
  }

  public toObject() {
    return {
      ...this,
    };
  }

}
