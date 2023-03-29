import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import { CommentsMemoryRepository } from './comments-memory.repository';
import { CommentEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    private readonly commentsRepository: CommentsMemoryRepository
  ) { }

  public async create(comment: CreateCommentDto) {
    const commentEntity = await new CommentEntity(comment)
    return this.commentsRepository.create(commentEntity);
  }

  public async destroy(id: string) {
    await this.commentsRepository.destroy(id);
  }

  public async list(postID: string) {
    const comments = await this.commentsRepository.list(postID);
    return comments.map(comment => new CommentEntity(comment));
  }

}
