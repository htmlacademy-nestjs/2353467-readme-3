import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';
import { UserQuery } from './user.query';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoidValidationPipe } from '@project/shared/pipes';
import { NotifyService } from '../notify/notify.service';
import { ResetPassword } from '@project/shared/app-types';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../authentication/guards/local-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get()
  public findAll(@Query() params: UserQuery) {
    return this.userService.findAll(params);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get(':id')
  public find(@Param('id', MongoidValidationPipe) id: string) {
    return this.userService.find(id);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/')
  public async create(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);
    const { email, firstname, lastname } = user;
    await this.notifyService.createUser({ email, firstname, lastname });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated.',
  })
  @Patch('/:id')
  public async update(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() userData: UpdateUserDto
  ) {
    return await this.userService.update(id, userData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted.',
  })
  @Delete(':id')
  public async destroy(@Param('id', MongoidValidationPipe) id: string) {
    return await this.userService.destroy(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/reset')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password',
  })
  public async resrtPassword(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() passwords: ResetPassword
  ) {
    return this.userService.resetPassword(
      id,
      passwords.oldPassword,
      passwords.newPassword
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/:id/subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subscribe to author',
  })
  public async subscribeAuthor(@Param('id', MongoidValidationPipe) id: string) {
    return this.userService.subscribeAuthor();
  }
}
