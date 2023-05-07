import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}

export interface ResetPassword {
  oldPassword: string;
  newPassword: string;
}

export interface CreateUserNotify {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
}

export enum CreateUserNotifyValidations {
  EmailNotValid = 'The email is not valid',
  FirstNameIsEmpty = 'The first name is empty',
  LastNameIsEmpty = 'The userId is empty',
}
