import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {

  @ApiProperty({
    description: 'Post ID',
    example: ''
  })
  public postID: string;

  @ApiProperty({
    description: 'User ID',
    example: ''
  })
  public userID: string;

}