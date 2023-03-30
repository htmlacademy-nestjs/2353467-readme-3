import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { CreatePostTextDto, CreatePostVideoDto, CreatePostPhotoDto, CreatePostQuoteDto, CreatePostLinkeDto } from './dto/create-post.dto';
import { PostType } from "@project/shared/app-types";
import { PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo } from './rdo/post.rdo';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) { }

  // Get all posts

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List tags.',
  })
  @Get()
  public all() {
    const tags = this.postsService.all();
  }

  // Create post

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public create(@Body() postData: CreatePostTextDto | CreatePostVideoDto | CreatePostPhotoDto | CreatePostQuoteDto | CreatePostLinkeDto) {
    const post = this.postsService.create(postData);

    if (postData.type === PostType.Text) {
      return fillObject(PostTextRdo, post);
    }
    if (postData.type === PostType.Video) {
      return fillObject(PostVideoRdo, post);
    }
    if (postData.type === PostType.Photo) {
      return fillObject(PostPhotoRdo, post);
    }
    if (postData.type === PostType.Quote) {
      return fillObject(PostQuoteRdo, post);
    }
    if (postData.type === PostType.Link) {
      return fillObject(PostLinkRdo, post);
    }
  }

  // Update post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post updated.',
  })
  @Put(':id')
  public update(@Param('id') id: string, @Body() postData) {

  }

  // Remove post

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post remove.',
  })
  @Delete(':id')
  public destroy(@Param('id') id: string) {

  }
}
