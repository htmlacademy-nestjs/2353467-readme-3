import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    MongooseModule.forRoot(
      'mongodb://admin:pass@localhost:27017/users?authSource=admin',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
