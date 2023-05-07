import { CreateUserNotifyEntity } from './create-user-notify.entity';
import { CreateUserNotifyDto } from './dto/create-user-notify.dto';
import { CreateUserNotifyRepository } from './create-user-notify.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserNotifyService {
  constructor(
    private readonly emailSubscriberRepository: CreateUserNotifyRepository
  ) {}

  public async addSubscriber(subscriber: CreateUserNotifyDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository.create(
      new CreateUserNotifyEntity(subscriber)
    );
  }
}
