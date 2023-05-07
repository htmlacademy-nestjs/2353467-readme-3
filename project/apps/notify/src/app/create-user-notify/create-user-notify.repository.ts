import { CRUDRepository } from '@project/util/util-types';
import { CreateUserNotifyEntity } from './create-user-notify.entity';
import { CreateUserNotify } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserNotifyModel } from './create-user-notify.model';
import { Model } from 'mongoose';

@Injectable()
export class CreateUserNotifyRepository
  implements CRUDRepository<CreateUserNotifyEntity, string, CreateUserNotify>
{
  constructor(
    @InjectModel(CreateUserNotifyModel.name)
    private readonly emailSubscriberModel: Model<CreateUserNotifyModel>
  ) {}

  public async create(item: CreateUserNotifyEntity): Promise<CreateUserNotify> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ _id: id });
  }

  public async find(id: string): Promise<CreateUserNotify | null> {
    return this.emailSubscriberModel.findOne({ _id: id }).exec();
  }

  public async update(
    id: string,
    item: CreateUserNotifyEntity
  ): Promise<CreateUserNotify> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<CreateUserNotify | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }
}
