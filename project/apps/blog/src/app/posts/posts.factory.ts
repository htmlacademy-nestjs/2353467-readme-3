import { PostType } from "@project/shared/app-types";
import { PostLinkEntity, PostPhotoEntity, PostQuoteEntity, PostTextEntity, PostVideoEntity } from "./posts.entity";
import { PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo } from "./rdo/post.rdo";
import { fillObject } from '@project/util/util-core';

export class PostFactory {


  public getEntity(post) {
    switch (post.type) {
      case PostType.Text :
        return new PostTextEntity(post);
        break;
      case PostType.Video :
        return new PostVideoEntity(post);
        break;
      case PostType.Photo :
        return new PostPhotoEntity(post);
        break;
      case PostType.Quote :
        return new PostQuoteEntity(post);
        break;
      case PostType.Link :
        return new PostLinkEntity(post);
        break;
      default :
        console.log(`Add Entity for type: ${post.type}`);
    }

  }

  public getRDO(postData) {
    const post = { ...postData, ...postData.data };

    switch (post.type) {
      case PostType.Text :
        return fillObject(PostTextRdo, post);
        break;
      case PostType.Video :
        return fillObject(PostVideoRdo, post);
        break;
      case PostType.Photo :
        return fillObject(PostPhotoRdo, post);
        break;
      case PostType.Quote :
        return fillObject(PostQuoteRdo, post);
        break;
      case PostType.Link :
        return fillObject(PostLinkRdo, post);
        break;
      default :
        console.log(`Add RDO for type: ${post.type}`);
    }
  }

  public getDTO() {
  }
}