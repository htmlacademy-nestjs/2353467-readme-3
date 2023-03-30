import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "libs/shared/app-types/src/lib/post-type.enum";

class CreatePostDto {

  @ApiProperty({
    description: 'Post title',
  })
  public title: string;

  @ApiProperty({
    description: 'Post type',
  })
  public type: PostType;

  @ApiProperty({
    description: 'List tags',
  })
  public tags: string;

  @ApiProperty({
    description: 'User ID',
  })
  public userID: string;
}

export class CreatePostTextDto extends CreatePostDto {
  @ApiProperty({
    description: 'Text anonce\'s',
  })
  public anonce: string;
}

export class CreatePostVideoDto extends CreatePostDto {
  @ApiProperty({
    description: 'Link to video',
  })
  public video: string;
}

export class CreatePostPhotoDto extends CreatePostDto {
  @ApiProperty({
    description: 'Photo',
  })
  public photo: string;
}

export class CreatePostQuoteDto extends CreatePostDto {
  @ApiProperty({
    description: 'Quote',
  })
  public quote: string;
}

export class CreatePostLinkeDto extends CreatePostDto {
  @ApiProperty({
    description: 'Link',
  })
  public link: string;
}