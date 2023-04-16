import {Body, Controller, HttpStatus, Post, Delete, Param, Get, Query, HttpCode} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { fillObject } from '@project/util/util-core';
import { log } from 'console';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {

  constructor(
    private readonly commentService: CommentsService
  ) { }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'List comments.',
  })
  @Get()
  public async findAll(@Query() params) {
    const comments = await this.commentService.findAll(params);
    return comments.map(item => fillObject(CommentRdo, item));
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comments by ID',
  })
  @Get()
  public async find(@Param('id') id: string) {
    const comment = await this.commentService.find(Number(id));
    return fillObject(CommentRdo, comment);
  }


  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public create(@Body() commentData: CreateCommentDto) {
    const comment = this.commentService.create(commentData);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment update.',
  })
  @Post()
  public update(@Param('id') id: string, @Body() commentData: CreateCommentDto) {
    const comment = this.commentService.update(Number(id), commentData);
    return fillObject(CommentRdo, comment);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment remove.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Param('id') id: number) {
    this.commentService.destroy(id);
    return true;
  }

}
