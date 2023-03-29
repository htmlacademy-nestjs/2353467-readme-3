import { Body, Controller, HttpStatus, Post, Delete, Param, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {

  constructor(
    private readonly commentService: CommentsService
  ) { }

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public async create(@Body() commentData: CreateCommentDto) {
    const comment = await this.commentService.create(commentData);

    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment remove.',
  })
  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    await this.commentService.destroy(id);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'List comments.',
  })
  @Get(':postID')
  public async list(@Param('postID') postID: string) {
    return await this.commentService.list(postID);
  }

}
