import dayjs from 'dayjs';
import { Post, PostLink, PostPhoto, PostQuote, PostText, PostType, PostVideo } from "@project/shared/app-types";

class PostEntity implements Post {

  public _id: string;
  public title: string;
  public tags: string[];
  public type: PostType;
  public userID: string;
  public createdDate: number;
  public updatedDate: number;

  constructor(post: Post) {
    this._id = post._id;
    this.title = post.title;
    this.tags = post.tags;
    this.type = post.type;
    this.userID = post.userID;
    this.createdDate = post.createdDate;
    this.updatedDate = post.updatedDate;
  }

  public toObject() {
    return { ...this };
  }

  public setCreatedDate() {
    this.createdDate = dayjs().unix();
    return this;
  }

  public setUpdatedDate() {
    this.updatedDate = dayjs().unix();
    return this;
  }

}

export class PostTextEntity extends PostEntity {
  public anonce: string;

  constructor(post: PostText) {
    super();
    this.anonce = post.anonce;
  }
}

export class PostVideoEntity extends PostEntity {
  public video: string;

  constructor(post: PostVideo) {
    super();
    this.video = post.video;
  }
}

export class PostPhoteEntity extends PostEntity {
  public photo: string;

  constructor(post: PostPhoto) {
    super();
    this.photo = post.photo;
  }
}

export class PostQuoteEntity extends PostEntity {
  public quote: string;

  constructor(post: PostQuote) {
    super();
    this.quote = post.quote;
  }
}

export class PostLinkEntity extends PostEntity {
  public link: string;

  constructor(post: PostLink) {
    super();
    this.link = post.link;
  }
}