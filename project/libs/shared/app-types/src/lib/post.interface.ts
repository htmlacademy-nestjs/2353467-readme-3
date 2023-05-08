import { Like } from './like.interface';
import { PostType } from './post-type.enum';
import { Tag } from './tag.interface';
import { Comment } from './comment.interface';
import { Prisma } from '@prisma/client';

export interface BasePost {
  id?: number;
  type: PostType | string;
  title: string;
  data?: Prisma.JsonValue;
  userID: string;
  originalUserID?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  tags?: number[] | Tag[];
  comments?: number[] | Comment[];
  likes?: number[] | Like[];
}

export interface PostText extends BasePost {
  anonce: string;
  text: string;
}

export interface PostVideo extends BasePost {
  video: string;
}

export interface PostPhoto extends BasePost {
  photo: string;
}

export interface PostQuote extends BasePost {
  quote: string;
  author: string;
}

export interface PostLink extends BasePost {
  link?: string;
}

export type IPost = PostText | PostVideo | PostPhoto | PostQuote | PostLink;

export interface PostConditions {
  published?: boolean;
  title?: {
    contains: string;
  };
  tags?: {
    some: {
      id: {
        in: number[];
      };
    };
  };
  userID?: {
    in: string[];
  };
  type?: {
    in: PostType[];
  };
}
