import dayjs from 'dayjs';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { UserMemoryRepository } from '../user/user-memory.repository';
import { UserEntity } from '../user/user.entity';
import { AuthUser } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: UserMemoryRepository
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

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUser.UserExist);
    }

    const userEntity = await new UserEntity(newUser).setPassword(password);
    return this.blogUserRepository.create(userEntity);
  }

  public async verifyUser(credentials: LoginUserDto) {
    const { email, password } = credentials;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUser.UserNotFound);
    }

    const blogUserEntity = new UserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUser.UserPasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
