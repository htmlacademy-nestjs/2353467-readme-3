import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { CreatePostDto } from './dto/create-post.dto';
import { PostConnectionsTypes } from "./posts-connections-types";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) { }

  private transformPostToDto(post) {

    const postConnectionType = PostConnectionsTypes.find(connectionType => connectionType.type === post.type);
    if (postConnectionType) {
      return fillObject(postConnectionType.rdo, post);
    }
  }

  // Get all posts

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List tags.',
  })
  @Get()
  public async all(@Query() params) {
    const posts = await this.postsService.all(params);
    return posts.map(post => this.transformPostToDto(post));
  }

  // Create post

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public async create(@Body() postData: CreatePostDto) {
    const post = await this.postsService.create(postData);
    return this.transformPostToDto(post);
  }

  // Update post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post updated.',
  })
  @Put(':id')
  public update(@Param('id') id: string, @Body() postData: CreatePostDto) {
    const post = this.postsService.update(id, postData);
    return this.transformPostToDto(post);
  }

  // Remove post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post remove.',
  })
  @Delete(':id')
  public destroy(@Param('id') id: string) {
    this.postsService.destroy(id);
    return true;
  }
}
