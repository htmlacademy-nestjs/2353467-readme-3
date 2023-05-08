import { Injectable } from '@nestjs/common';
import { SubscriberModel } from './subscriber.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, User } from '@project/shared/app-types';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberModel.name)
    private readonly subscriberModel: Model<SubscriberModel>
  ) {}

  public async find(id: string): Promise<Subscriber[] | null> {
    return this.subscriberModel.find().where('subscriberID', id).exec();
  }

  public async create(subscriberData: SubscriberEntity): Promise<Subscriber> {
    const subscriber = new this.subscriberModel(subscriberData);
    return subscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.subscriberModel.deleteOne({ _id: id });
  }
}
