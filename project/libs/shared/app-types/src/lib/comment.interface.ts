import { IPost } from "./post.interface";

export interface Comment {
  id?: number;
  text: string;
  postID: number;
  userID: string;
  createdAt?: Date;
}

export interface CommentConditions {
  postID?: object;
  userID?: object;
}