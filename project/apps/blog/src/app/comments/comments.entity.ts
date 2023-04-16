import { User } from "@project/shared/app-types";
import { Comment, IPost } from "@project/shared/app-types";

export class CommentEntity implements Comment {
    id: number;
    text: string;
    postID: number;
    userID: string;
    createdAt: string;
    post: IPost;
    user: User;

  constructor(comment: Comment) {
    this.text = comment.text;
    this.postID = comment.postID;
    this.userID = comment.userID;
    this.createdAt = comment.createdAt;
    this.post = comment.post;
    this.user = comment.user;
  }

  public toObject() {
    return {
      ...this,
      post:
    };
  }

}