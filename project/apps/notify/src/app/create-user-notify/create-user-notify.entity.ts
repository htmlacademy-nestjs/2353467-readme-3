import { Entity } from '@project/util/util-types';
import { CreateUserNotify } from '@project/shared/app-types';

export class CreateUserNotifyEntity
  implements Entity<CreateUserNotifyEntity>, CreateUserNotify
{
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userID: string;

  constructor(subscriber: CreateUserNotify) {
    this.email = subscriber.email;
    this.lastname = subscriber.lastname;
    this.firstname = subscriber.firstname;
    this.id = subscriber.id ?? '';
  }

  public toObject(): CreateUserNotifyEntity {
    return { ...this };
  }
}
