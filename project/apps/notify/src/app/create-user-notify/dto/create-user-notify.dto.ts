import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserNotifyValidations } from '@project/shared/app-types';

export class CreateUserNotifyDto {
  @IsEmail({}, { message: CreateUserNotifyValidations.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: CreateUserNotifyValidations.FirstNameIsEmpty })
  public firstname: string;

  @IsNotEmpty({ message: CreateUserNotifyValidations.LastNameIsEmpty })
  public lastname: string;
}
