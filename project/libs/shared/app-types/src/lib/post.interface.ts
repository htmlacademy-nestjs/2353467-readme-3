import { PostType } from "./post-type.enum";

export interface BasePost {
  id?: number;
  title: string;
  type: PostType;
  userID: string;
  originalUserID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  published: boolean;
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

export interface PostParams {
  sort?: string;
  limit?: number;
  page?: number;
  users?: number;
}
