import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from '@project/shared/app-types';
import { IsEmail, IsISO8601, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@mail.ru',
  })
  @IsEmail({}, { message: AuthUser.UserEmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1995-01-01',
  })
  @IsISO8601({}, { message: AuthUser.UserBirthDateNotValid })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  @IsString()
  @Length(3, 50)
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov',
  })
  @IsString()
  @Length(3, 50)
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(6, 12)
  public password: string;
}
