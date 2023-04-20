import { PostType } from "./post-type.enum";

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
