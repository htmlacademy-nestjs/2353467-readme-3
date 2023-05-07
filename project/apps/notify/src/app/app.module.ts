import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { CreateUserNotifyModule } from './create-user-notify/create-user-notify.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('notify.db')),
    CreateUserNotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
