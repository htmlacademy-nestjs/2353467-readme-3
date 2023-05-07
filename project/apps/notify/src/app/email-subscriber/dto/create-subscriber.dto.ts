import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberValidations } from '@project/shared/app-types';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberValidations.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: SubscriberValidations.FirstNameIsEmpty })
  public firstname: string;

  @IsNotEmpty({ message: SubscriberValidations.LastNameIsEmpty })
  public lastname: string;
}