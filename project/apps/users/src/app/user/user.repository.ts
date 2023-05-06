import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '@project/shared/app-types';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserQuery } from './user.query';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async findAll(params: UserQuery): Promise<User[] | null> {
    const users = this.userModel.find();
    console.log('params', params);

    if (params.users) {
      users.where('_id').in(params.users.split(','));
    }

    if (params.page && params.limit) {
      const skip = params.page * params.limit;
      users.skip(skip);
    }

    return users.limit(params.limit).sort({ createdAt: params.sort }).exec();
  }

  public async find(id: string): Promise<User | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async create(item: UserEntity): Promise<User> {
    const newBlogUser = new this.userModel(item);
    return newBlogUser.save();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({ _id: id });
  }
}
