import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostQuery } from './posts.query';
import { JwtAuthGuard } from '@project/shared/guards';
import { RequestWithUser } from '@project/shared/app-types';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get my feeds',
  })
  @Get('/feed')
  public async feed() {
    console.log('feed');
  }

  // Get all posts

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List posts',
  })
  @Get()
  public async findAll(@Query() params: PostQuery) {
    return await this.postsService.findAll(params);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post by ID',
  })
  @Get(':id')
  public async find(@Param('id') id: number) {
    return await this.postsService.find(id);
  }

  // Create post

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post successfully add',
  })
  @Post()
  public async create(
    @Body() postData: CreatePostDto,
    @Req() { user }: RequestWithUser
  ) {
    console.log('user', user);

    return await this.postsService.create(postData);
  }

  // Update post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post updated',
  })
  @Put(':id')
  public update(@Param('id') id: number, @Body() postData: CreatePostDto) {
    return this.postsService.update(id, postData);
  }

  // Remove post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post remove',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Param('id') id: number) {
    this.postsService.destroy(id);
  }

  // Repost

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Repost',
  })
  @Post('/:id/repost')
  @HttpCode(HttpStatus.NO_CONTENT)
  public repost(@Param('id') id: number, userID: string) {
    this.postsService.repost(id, userID);
  }
}
