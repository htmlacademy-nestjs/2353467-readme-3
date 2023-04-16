import { ApiProperty } from "@nestjs/swagger";
import { BasePost, PostType } from "@project/shared/app-types";
import { Expose } from "class-transformer";

class BasePostRdo implements BasePost {
  @ApiProperty({
    description: 'Post ID',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Post title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post type',
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'User ID',
  })
  @Expose()
  public userID: string;

  @ApiProperty({
    description: 'User ID',
  })
  @Expose()
  public published: boolean;

  @ApiProperty({
    description: 'Created date',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
  })
  @Expose()
  public updatedAt: Date;
}

export class PostTextRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Text anonce\'s',
  })
  @Expose()
  public anonce: string;
}

export class PostVideoRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Link to video',
  })
  @Expose()
  public video: string;
}

export class PostPhotoRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Photo',
  })
  @Expose()
  public photo: string;
}

export class PostQuoteRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Quote',
  })
  @Expose()
  public quote: string;
}

export class PostLinkRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Link',
  })
  @Expose()
  public link: string;
}

export type PostRdo =
  | PostTextRdo
  | PostVideoRdo
  | PostPhotoRdo
  | PostQuoteRdo
  | PostLinkRdo
