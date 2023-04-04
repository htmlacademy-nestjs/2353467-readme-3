import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1995-01-01'
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @Expose()
  public lastname: string;
}