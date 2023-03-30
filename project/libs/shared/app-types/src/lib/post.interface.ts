import { PostType } from "./post-type.enum";

export interface Post {
  _id?: string;
  title: string;
  tags: string[];
  type: PostType;
  userID: string;
  createdDate: number;
  updatedDate: number;
}

export interface PostText extends Post {
  anonce: string;
}

export interface PostVideo extends Post {
  video: string;
}

export interface PostPhoto extends Post {
  photo: string;
}

export interface PostQuote extends Post {
  quote: string;
}

export interface PostLink extends Post {
  link: string;
}