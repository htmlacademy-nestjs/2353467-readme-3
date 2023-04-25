import dayjs from 'dayjs';
import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserRole, AuthUser } from '@project/shared/app-types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { UserEntity } from './user.entity';
import { fillObject } from '@project/util/util-core';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async find(id: string) {
    const user = this.userRepository.find(id);
    return fillObject(UserRdo, user);
  }

  public async create(userData: CreateUserDto) {
    const { email, firstname, lastname, password, dateBirth } = userData;

    const newUser = {
      email,
      firstname,
      lastname,
      role: UserRole.User,
      avatar: '',
      dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUser.UserExist);
    }

    const userEntity = await new UserEntity(newUser).setPassword(password);
    const user = this.userRepository.create(userEntity);
    return fillObject(UserRdo, user);
  }


}