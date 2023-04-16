import { IPost } from "./post.interface";

export interface Comment {
  id?: number;
  text: string;
  postID: number;
  userID: string;
  createdAt?: string;
  post?: IPost
}