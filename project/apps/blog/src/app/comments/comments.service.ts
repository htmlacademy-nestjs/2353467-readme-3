import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';

@Injectable()
export class CommentsService {

  constructor(
    private readonly commentsRepository: CommentsRepository
  ) { }

  public async findAll(params) {
    const comments = await this.commentsRepository.findAll(params);
    return comments.map(item => fillObject(CommentRdo, item));
  }

  public async find(id: number) {
    const comment = await this.commentsRepository.find(id);
    return fillObject(CommentRdo, comment);
  }

  public async create(commentData: CreateCommentDto) {
    const commentEntity = new CommentEntity(commentData);
    const comment = await this.commentsRepository.create(commentEntity);
    return fillObject(CommentRdo, comment);
  }

  public async update(id: number, commentData: CreateCommentDto) {
    const commentEntity = new CommentEntity(commentData);
    const comment = await this.commentsRepository.update(id, commentEntity);
    return fillObject(CommentRdo, comment);
  }

  public async destroy(id: number) {
    this.commentsRepository.destroy(id);
  }

}
