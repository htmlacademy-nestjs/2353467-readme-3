
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';

import { LoginUserDto } from './dto/login-user.dto';
import { AuthUser } from '@project/shared/app-types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

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

  public async find(id: string) {
    return this.userRepository.find(id);
  }
}
