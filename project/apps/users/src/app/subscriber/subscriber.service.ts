import { Injectable } from '@nestjs/common';
import { Subscriber, TokenPayload } from '@project/shared/app-types';
import { fillObject } from '@project/util/util-core';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberRdo } from './rdo/subscriber.rdo';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { User } from '@project/shared/app-types';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  public async find(id: string): Promise<Subscriber[] | null> {
    const subscribers = await this.subscriberRepository.find(id);
    return subscribers.map((subscriber) =>
      fillObject(SubscriberRdo, subscriber)
    );
  }

  public async create(
    subscriberData: CreateSubscriberDto,
    user: TokenPayload
  ): Promise<Subscriber | null> {
    const newSubscriber = {
      subscriberID: user.id,
      authorID: subscriberData.authorID,
    };

    const entity = new SubscriberEntity(newSubscriber);
    const subscriber = await this.subscriberRepository.create(entity);
    return fillObject(SubscriberRdo, subscriber);
  }

  public async destroy(id: string): Promise<void> {
    await this.subscriberRepository.destroy(id);
  }
}
