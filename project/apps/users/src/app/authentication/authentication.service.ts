import dayjs from 'dayjs';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { AuthUser } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

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

  public async verifyUser(credentials: LoginUserDto) {
    const { email, password } = credentials;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUser.UserNotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUser.UserPasswordWrong);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
