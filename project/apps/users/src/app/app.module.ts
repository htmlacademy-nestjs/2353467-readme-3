import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from "@project/config/config-users";

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
