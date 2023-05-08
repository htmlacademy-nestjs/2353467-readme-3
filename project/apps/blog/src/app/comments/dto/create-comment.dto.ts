import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text comment',
    example: 'Test text',
  })
  @IsString()
  @Length(10, 300)
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '123',
  })
  @IsNumber()
  public postID: number;

  @ApiProperty({
    description: 'UserID send comment',
    example: '123',
  })
  @IsString()
  public userID: string;
}
