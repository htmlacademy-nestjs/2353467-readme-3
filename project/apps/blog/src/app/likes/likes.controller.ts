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
  public create(@Body() likeData: CreateLikeDto) {
    return this.likesService.create(likeData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like remove.',
  })
  @Delete(':id')
  public destroy(@Param('id') id: string) {
    this.likesService.destroy(id);
    return true;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Count likes post\'s.',
  })
  @Get(':postID')
  public count(@Param('postID') postID: string) {
    return this.likesService.count(postID);
  }

}
