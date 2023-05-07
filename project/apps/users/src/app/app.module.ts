import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { getMongooseOptions } from '@project/util/util-core';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    NotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
