import {
  Req,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  UseGuards,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/pipes';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { TokenPayload } from '@project/shared/app-types';

@ApiTags('Subscriber')
@Controller('subscribers')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subscribers',
  })
  @Get(':id')
  public find(@Param('id', MongoidValidationPipe) id: string) {
    return this.subscriberService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create subscribers',
  })
  @Post()
  public create(@Body() subscriberData: CreateSubscriberDto, @Req() { user }) {
    return this.subscriberService.create(subscriberData, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete subscribe',
  })
  @Delete(':id')
  public destroy(@Param('id', MongoidValidationPipe) id: string) {
    return this.subscriberService.destroy(id);
  }
}
