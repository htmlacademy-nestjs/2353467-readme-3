import { ApiProperty } from "@nestjs/swagger";
import { Post, PostType } from "@project/shared/app-types";
import { Expose } from "class-transformer";

class PostRdo implements Post {
  @ApiProperty({
    description: 'Post ID',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Post title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'List tags',
  })
  @Expose()
  public tags: string[];

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
    description: 'Created date',
  })
  @Expose()
  public createdDate: number;

  @ApiProperty({
    description: 'Updated date',
  })
  @Expose()
  public updatedDate: number;
}

export class PostTextRdo extends PostRdo {
  @ApiProperty({
    description: 'Text anonce\'s',
  })
  @Expose()
  public anonce: string;
}

export class PostVideoRdo extends PostRdo {
  @ApiProperty({
    description: 'Link to video',
  })
  @Expose()
  public video: string;
}

export class PostPhotoRdo extends PostRdo {
  @ApiProperty({
    description: 'Photo',
  })
  @Expose()
  public photo: string;
}

export class PostQuoteRdo extends PostRdo {
  @ApiProperty({
    description: 'Quote',
  })
  @Expose()
  public quote: string;
}

export class PostLinkRdo extends PostRdo {
  @ApiProperty({
    description: 'Link',
  })
  @Expose()
  public link: string;
}