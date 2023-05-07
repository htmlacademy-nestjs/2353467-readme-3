import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthUser, TokenPayload, User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

  public async createToken(user: User) {
    const payload: TokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
