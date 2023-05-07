import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/app-types';
import { IsString, IsBoolean, Length, MaxLength } from 'class-validator';

class BasePostDto {
  @ApiProperty({ description: 'Post title' })
  @IsString()
  @Length(20, 50)
  public title: string;

  @ApiProperty({ description: 'Post type' })
  @IsString()
  public type: PostType;

  @ApiProperty({ description: 'List tags' })
  public tags: number[];

  @ApiProperty({ description: 'User ID' })
  @IsString()
  public userID: string;

  @ApiProperty({ description: 'Post is published' })
  @IsBoolean()
  public published: boolean;
}

export class CreatePostTextDto extends BasePostDto {
  @ApiProperty({ description: "Text anonce's" })
  @Length(20, 255)
  public anonce: string;

  @ApiProperty({ description: 'Text post' })
  @Length(100, 1024)
  public text: string;
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
  @Length(20, 300)
  public quote: string;

  @ApiProperty({ description: 'Author quote' })
  @Length(3, 50)
  public author: string;
}

export class CreatePostLinkDto extends BasePostDto {
  @ApiProperty({ description: 'Link' })
  @MaxLength(300)
  public link: string;
}

export type CreatePostDto =
  | CreatePostTextDto
  | CreatePostVideoDto
  | CreatePostPhotoDto
  | CreatePostQuoteDto
  | CreatePostLinkDto;
