import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostQuery } from './posts.query';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) { }

  // Get all posts

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List posts',
  })
  @Get('/')
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

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post successfully add',
  })
  @Post()
  public async create(@Body() postData: CreatePostDto) {
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

}
