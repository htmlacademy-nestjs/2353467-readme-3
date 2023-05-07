import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateUserNotifyModel,
  CreateUserNotifySchema,
} from './create-user-notify.model';
import { CreateUserNotifyRepository } from './create-user-notify.repository';
import { CreateUserNotifyService } from './create-user-notify.service';
import { CreateUserNotifyController } from './create-user-notify.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreateUserNotifyModel.name, schema: CreateUserNotifySchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('notify.rabbit')
    ),
    MailModule,
  ],
  controllers: [CreateUserNotifyController],
  providers: [
    CreateUserNotifyService,
    CreateUserNotifyRepository,
    CreateUserNotifyController,
  ],
})
export class CreateUserNotifyModule {}
