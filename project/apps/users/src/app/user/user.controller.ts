import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoidValidationPipe } from '@project/shared/pipes';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

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
  @UseGuards(JwtAuthGuard)
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
    await this.notifyService.registerSubscriber({ email, firstname, lastname });
    return user;
  }
}
