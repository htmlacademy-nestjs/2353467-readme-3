import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Author ID',
  })
  @IsString()
  public authorID: string;
}
