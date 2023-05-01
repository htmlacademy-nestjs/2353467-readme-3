export interface Subscriber {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
}

export enum SubscriberValidations {
  EmailNotValid = 'The email is not valid',
  FirstNameIsEmpty = 'The first name is empty',
  LastNameIsEmpty = 'The userId is empty',
}
