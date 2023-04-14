import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  providers: [ UserRepository ],
  exports: [ UserRepository ],
  imports: [ MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ]) ],
})
export class UserModule { }
