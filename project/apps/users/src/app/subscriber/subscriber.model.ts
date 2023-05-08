import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'subscribers',
  timestamps: true,
})
export class SubscriberModel extends Document {
  @Prop({ required: true })
  public subscriberID: string;

  @Prop({ required: true })
  public authorID: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
