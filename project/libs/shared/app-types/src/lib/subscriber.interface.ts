export interface Subscriber {
  _id?: string;
  subscriberID: string;
  authorID: string;
}

export interface SubscribeAuthorNotify {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
}
