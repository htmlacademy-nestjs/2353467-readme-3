import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@mail.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}