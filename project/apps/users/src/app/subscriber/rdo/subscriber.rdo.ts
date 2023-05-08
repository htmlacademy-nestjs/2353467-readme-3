import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriberRdo {
  @ApiProperty({
    description: 'The uniq subscriber ID',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Subscriber ID',
  })
  @Expose()
  public subscriberID: string;

  @ApiProperty({
    description: 'Author ID',
  })
  @Expose()
  public authorID: string;
}
