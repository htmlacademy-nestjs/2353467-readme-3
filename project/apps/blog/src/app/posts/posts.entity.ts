import dayjs from 'dayjs';
import { BasePost, Like, PostLink, PostPhoto, PostQuote, PostText, PostType, PostVideo, Tag } from "@project/shared/app-types";

class BasePostEntity implements BasePost {

  public id: number;
  public title: string;
  public tagsIDs: number[];
  public type: PostType;
  public userID: string;
  public createdAt: number;
  public updatedAt: number;
  public published: boolean;
  public comments: Comment[];
  public tags: Tag[];
  public likes: Like[];


  constructor(post: BasePost) {
    //this.id = post.id;
    this.title = post.title;
    this.tagsIDs = post.tagsIDs;
    this.type = post.type;
    this.userID = post.userID;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.published = post.published;
  }

  public toObject() {
    return { ...this };
  }

  public setCreatedAt() {
    this.createdAt = dayjs().unix();
    return this;
  }

  public setUpdatedAt() {
    this.updatedAt = dayjs().unix();
    return this;
  }

}

export class PostTextEntity extends BasePostEntity {
  public anonce: string;

  constructor(post: PostText) {
    super(post);
    this.anonce = post.anonce;
  }
}

export class PostVideoEntity extends BasePostEntity {
  public video: string;

  constructor(post: PostVideo) {
    super(post);
    this.video = post.video;
  }
}

export class PostPhotoEntity extends BasePostEntity {
  public photo: string;

  constructor(post: PostPhoto) {
    super(post);
    this.photo = post.photo;
  }
}

export class PostQuoteEntity extends BasePostEntity {
  public quote: string;

  constructor(post: PostQuote) {
    super(post);
    this.quote = post.quote;
  }
}

export class PostLinkEntity extends BasePostEntity {
  public link: string;

  constructor(post: PostLink) {
    super(post);
    this.link = post.link;
  }
}

export type PostEntity =
  | PostTextEntity
  | PostPhotoEntity
  | PostVideoEntity
  | PostQuoteEntity
  | PostLinkEntity;
