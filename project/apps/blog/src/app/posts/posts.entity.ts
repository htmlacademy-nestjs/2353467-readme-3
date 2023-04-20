import { BasePost, Like, PostLink, PostPhoto, PostQuote, PostText, PostType, PostVideo, Tag } from "@project/shared/app-types";

class BasePostEntity implements BasePost {
  public id: number;
  public type: PostType;
  public title: string;
  public data: object;
  public userID: string;
  public published: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  // relationship
  public comments: Comment[];
  public tags: Tag[];
  public likes: Like[];

  constructor(post: BasePost) {
    this.title = post.title;
    this.userID = post.userID;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.published = post.published;
  }

  public toObject() {
    return {
      ...this,
      tags: [ ...this.tags ],
      comments: [ ...this.comments ],
      likes: [ ...this.likes ],
    };
  }
}

export class PostTextEntity extends BasePostEntity {
  public anonce: string;

  constructor(post: PostText) {
    super(post);
    this.type = PostType.Text;
    this.data = { anonce: post.anonce };
  }
}

export class PostVideoEntity extends BasePostEntity {
  public video: string;

  constructor(post: PostVideo) {
    super(post);
    this.type = PostType.Video;
    this.data = { video: post.video };
  }
}

export class PostPhotoEntity extends BasePostEntity {
  public photo: string;

  constructor(post: PostPhoto) {
    super(post);
    this.type = PostType.Photo;
    this.data = { photo: post.photo };
  }
}

export class PostQuoteEntity extends BasePostEntity {
  public quote: string;

  constructor(post: PostQuote) {
    super(post);
    this.type = PostType.Quote;
    this.data = { quote: post.quote };
  }
}

export class PostLinkEntity extends BasePostEntity {
  public link: string;

  constructor(post: PostLink) {
    super(post);
    this.type = PostType.Link;
    this.data = { link: post.link };
  }
}

export type PostEntity =
  | PostTextEntity
  | PostPhotoEntity
  | PostVideoEntity
  | PostQuoteEntity
  | PostLinkEntity;
