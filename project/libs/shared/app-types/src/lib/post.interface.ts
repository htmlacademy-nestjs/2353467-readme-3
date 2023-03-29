import { PostType } from "./post-type.enum";

export interface Post {
  _id?: string;
  title: string;
  tags: string[];
  type: PostType;
  createdAt: string;
  updatedAt: string;
}

export interface PostText extends Post {
  preview: string;
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