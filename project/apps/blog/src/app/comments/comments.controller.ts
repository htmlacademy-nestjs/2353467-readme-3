import { Body, Controller, HttpStatus, Post, Delete, Param, Get, Query, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

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
    return this.commentService.findAll(params);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comments by ID',
  })
  @Get(':id')
  public async find(@Param('id') id: number) {
    return this.commentService.find(id);
  }


  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment successfully add.',
  })
  @Post()
  public create(@Body() commentData: CreateCommentDto) {
    return this.commentService.create(commentData);
  }

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: 'Comment update.',
  })
  @Post()
  public update(@Param('id') id: number, @Body() commentData: CreateCommentDto) {
    return this.commentService.update(Number(id), commentData);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment remove.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Param('id') id: number) {
    this.commentService.destroy(id);
  }

}
