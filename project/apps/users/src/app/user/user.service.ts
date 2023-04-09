import dayjs from 'dayjs';
import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserRole, AuthUser } from '@project/shared/app-types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async register(user: CreateUserDto) {
    const { email, firstname, lastname, password, dateBirth } = user;

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
    return this.userRepository.create(userEntity);
  }

  public async get(id: string) {
    return this.userRepository.findById(id);
  }
}