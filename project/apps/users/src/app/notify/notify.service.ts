import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { SubscribeAuthorDto } from './dto/subscribe-author.dto';
import { RabbitRouting } from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async createUser(dto: CreateUserDto) {
    return this.rabbitClient.publish<CreateUserDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.CreateUser,
      { ...dto }
    );
  }

  public async subscribeAuthor(dto: SubscribeAuthorDto) {
    return this.rabbitClient.publish<SubscribeAuthorDto>(
      'notify.subscribe.author',
      RabbitRouting.SubscribeAuthor,
      { ...dto }
    );
  }
}
