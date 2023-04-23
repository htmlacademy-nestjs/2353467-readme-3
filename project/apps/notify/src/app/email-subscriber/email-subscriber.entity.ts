import { Entity } from '@project/util/util-types';
import { Subscriber } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userID: string;

  constructor(subscriber: Subscriber) {
    this.email = subscriber.email;
    this.lastname = subscriber.lastname;
    this.firstname = subscriber.firstname;
    this.id = subscriber.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}