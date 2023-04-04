import {
  CreatePostLinkDto,
  CreatePostPhotoDto,
  CreatePostQuoteDto,
  CreatePostTextDto,
  CreatePostVideoDto
} from "./dto/create-post.dto";
import {PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo} from "./rdo/post.rdo";
import {PostLinkEntity, PostPhotoEntity, PostQuoteEntity, PostTextEntity, PostVideoEntity} from "./posts.entity";


export const PostConnectionsTypes = [
  {
    type: 'Text',
    dto: CreatePostTextDto,
    rdo: PostTextRdo,
    entity: PostTextEntity,
  },
  {
    type: 'Video',
    dto: CreatePostVideoDto,
    rdo: PostVideoRdo,
    entity: PostVideoEntity,
  },
  {
    type: 'Photo',
    dto: CreatePostPhotoDto,
    rdo: PostPhotoRdo,
    entity: PostPhotoEntity,
  },
  {
    type: 'Quote',
    dto: CreatePostQuoteDto,
    rdo: PostQuoteRdo,
    entity: PostQuoteEntity,
  },
  {
    type: 'Link',
    dto: CreatePostLinkDto,
    rdo: PostLinkRdo,
    entity: PostLinkEntity,
  },
];
