import { Subscriber, User, UserRole } from '@project/shared/app-types';

export class SubscriberEntity implements Subscriber {
  public _id: string;
  public subscriberID: string;
  public authorID: string;

  constructor(subscriber: Subscriber) {
    this.fillEntity(subscriber);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(subscriber: Subscriber) {
    this._id = subscriber._id;
    this.subscriberID = subscriber.subscriberID;
    this.authorID = subscriber.authorID;
  }
}
