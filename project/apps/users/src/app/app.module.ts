import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from "@project/config/config-users";
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
