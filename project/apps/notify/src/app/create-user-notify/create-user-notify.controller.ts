import { CreateUserNotifyDto } from './dto/create-user-notify.dto';
import { CreateUserNotifyService } from './create-user-notify.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller()
export class CreateUserNotifyController {
  constructor(
    private readonly subscriberService: CreateUserNotifyService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'notify',
    routingKey: RabbitRouting.CreateUser,
    queue: 'notify',
  })
  public async create(subscriber: CreateUserNotifyDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
