import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
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
  public async create(@Body() likeData: CreateLikeDto) {
    await this.likesService.create(likeData);
    return true;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like remove.',
  })
  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    await this.likesService.destroy(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Count likes post\'s.',
  })
  @Get(':postID')
  public async count(@Param('postID') postID: string) {
    return await this.likesService.count(postID);
  }

}
