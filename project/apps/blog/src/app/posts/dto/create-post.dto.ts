import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/shared/app-types";

class BasePostDto {

  @ApiProperty({ description: 'Post title' })
  public title: string;

  @ApiProperty({ description: 'Post type' })
  public type: PostType;

  @ApiProperty({ description: 'List tags' })
  public tags: number[];

  @ApiProperty({ description: 'User ID' })
  public userID: string;

  @ApiProperty({ description: 'Post is published' })
  public published: boolean;
}

export class CreatePostTextDto extends BasePostDto {
  @ApiProperty({ description: 'Text anonce\'s' })
  public anonce: string;
}

export class CreatePostVideoDto extends BasePostDto {
  @ApiProperty({ description: 'Link to video' })
  public video: string;
}

export class CreatePostPhotoDto extends BasePostDto {
  @ApiProperty({ description: 'Photo' })
  public photo: string;
}

export class CreatePostQuoteDto extends BasePostDto {
  @ApiProperty({ description: 'Quote' })
  public quote: string;
}

export class CreatePostLinkDto extends BasePostDto {
  @ApiProperty({ description: 'Link' })
  public link: string;
}


export type CreatePostDto =
  | CreatePostTextDto
  | CreatePostVideoDto
  | CreatePostPhotoDto
  | CreatePostQuoteDto
  | CreatePostLinkDto;
