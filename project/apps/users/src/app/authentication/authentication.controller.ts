import {
  Req,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { RequestWithUser } from '@project/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createToken(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }) {
    return this.authService.createToken({ ...user, _id: user.id });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password',
  })
  public async resrtPassword(
    @Req() { user },
    @Body() oldPassword: string,
    @Body() newPassword: string
  ) {
    return this.authService.resetPassword(user.id, oldPassword, newPassword);
  }
}
