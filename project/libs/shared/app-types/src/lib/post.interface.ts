import { Like } from "./like.interface";
import { PostType } from "./post-type.enum";
import { Tag } from "./tag.interface";
import { Comment } from "./comment.interface";

export interface BasePost {
  id?: number;
  type: PostType;
  title: string;
  data?: object;
  userID: string;
  originalUserID?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  tags?: number[];
}

export interface PostText extends BasePost {
  anonce: string;
}

export interface PostVideo extends BasePost {
  video: string;
}

export interface PostPhoto extends BasePost {
  photo: string;
}

export interface PostQuote extends BasePost {
  quote: string;
}

export interface PostLink extends BasePost {
  link: string;
}

export type IPost =
  | PostText
  | PostVideo
  | PostPhoto
  | PostQuote
  | PostLink;


export interface PostConditions {
  tags?: object;
  userID?: object;
  type?: object;
}