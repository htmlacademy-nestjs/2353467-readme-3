import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsRepository implements CRUDRepository<CommentEntity, number, Comment> {

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(params) {
    return await this.prisma.comment.findMany();
  }

  public async find(id: number): Promise<Comment|null> {
    return await this.prisma.comment.findFirst({
      where: { id },
    });
  }

  public async create(commentData: CommentEntity): Promise<Comment> {
    console.log('commentData ', commentData.toObject())
    return await this.prisma.comment.create({
      data: { ...commentData.toObject() }
    });
  }


  public async update(id: number, commentData: CommentEntity): Promise<Comment> {
    return await this.prisma.comment.update({
      where: { id },
      data: { ...commentData.toObject() },
    });
  }


  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }

/*
public async test(id) {
  return await this.prisma.comment.findFirst({
    where: { id: Number(id) },
  });
}
*/

}
