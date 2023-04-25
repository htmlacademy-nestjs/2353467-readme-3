import { ApiProperty } from "@nestjs/swagger";
import { AuthUser } from "@project/shared/app-types";
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@mail.ru',
  })
  @IsEmail({}, { message: AuthUser.UserEmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}