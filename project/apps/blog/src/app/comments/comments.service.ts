import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    private readonly commentsRepository: CommentsRepository
  ) { }

  public async findAll(params) {
    return await this.commentsRepository.findAll(params);
  }

  public async find(id: number) {
    return await this.commentsRepository.find(id);
  }

  public create(commentData: CreateCommentDto) {
    const commentEntity = new CommentEntity(commentData);
    return this.commentsRepository.create(commentEntity);
  }

  public update(id: number, commentData: CreateCommentDto) {
    const commentEntity = new CommentEntity(commentData);
    return this.commentsRepository.update(id, commentEntity);
  }

  public destroy(id: number): void {
    this.commentsRepository.destroy(id);
  }



/*
public test(id) {
  return this.commentsRepository.test(id);
}
*/
}
