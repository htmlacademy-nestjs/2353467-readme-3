import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [ UserRepository, UserService ],
  exports: [ UserRepository ],
  controllers: [ UserController ],
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ])
  ],
})
export class UserModule { }
