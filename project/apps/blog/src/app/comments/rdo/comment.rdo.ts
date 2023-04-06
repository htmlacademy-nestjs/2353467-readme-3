import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export class CommentRdo implements Comment {

  @ApiProperty({
    description: 'ID Comment',
    example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Text comment',
    example: 'Test text'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '123'
  })
  @Expose()
  public postID: string;

  @ApiProperty({
    description: 'UserID send comment',
    example: '123'
  })
  @Expose()
  public userID: string;

  @ApiProperty({
    description: 'Created date in timestemp',
    example: '1680111536'
  })
  @Expose()
  public createdAt: number;
}