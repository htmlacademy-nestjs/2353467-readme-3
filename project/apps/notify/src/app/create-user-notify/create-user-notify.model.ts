import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserNotify } from '@project/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class CreateUserNotifyModel
  extends Document
  implements CreateUserNotify
{
  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public lastname: string;
}

export const CreateUserNotifySchema = SchemaFactory.createForClass(
  CreateUserNotifyModel
);
