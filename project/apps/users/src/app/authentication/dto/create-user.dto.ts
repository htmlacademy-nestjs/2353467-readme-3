import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1995-01-01',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}