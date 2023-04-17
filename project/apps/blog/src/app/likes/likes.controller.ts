import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {

  constructor(
    private readonly likesService: LikesService
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like successfully add.',
  })
  @Post()
  public create(@Body() likeData: CreateLikeDto) {
    return this.likesService.create(likeData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like remove.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Param('id') id: number) {
    this.likesService.destroy(id);
  }


}
