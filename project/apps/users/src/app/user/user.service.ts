import dayjs from 'dayjs';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRole, AuthUser } from '@project/shared/app-types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { UserEntity } from './user.entity';
import { UserQuery } from './user.query';
import { fillObject } from '@project/util/util-core';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(params: UserQuery) {
    const users = await this.userRepository.findAll(params);
    return fillObject(UserRdo, users);
  }

  public async find(id: string) {
    const user = await this.userRepository.find(id);
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
    const user = await this.userRepository.create(userEntity);
    return fillObject(UserRdo, user);
  }

  public async update(id: string, userData: UpdateUserDto) {
    const user = await this.userRepository.find(id);
    const userEntity = new UserEntity(user);
    const updateUserData = { ...userEntity, ...userData };
    const userUpdated = await this.userRepository.update(id, updateUserData);
    return fillObject(UserRdo, userUpdated);
  }

  public async destroy(id: string) {
    await this.userRepository.destroy(id);
  }

  public async resetPassword(
    userID: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.userRepository.find(userID);
    if (user) {
      const userEntity = new UserEntity(user);

      if (!(await userEntity.comparePassword(oldPassword))) {
        throw new UnauthorizedException(AuthUser.UserPasswordWrong);
      }

      const updateUserData = await userEntity.setPassword(newPassword);
      await this.userRepository.update(userID, updateUserData);
      return true;
    }
  }

  public async subscribeAuthor() {}
}
