import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsRepository implements CRUDRepository<CommentEntity, number, Comment> {

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(params): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      include: {
        post: true,
      }
    });
  }

  public async find(id: number): Promise<Comment> {
    return await this.prisma.comment.findFirst({
      where: { id },
      include: {
        post: true,
      }
    });
  }

  public async create(commentData: CommentEntity): Promise<Comment> {
    const entity = commentData.toObject();
    console.log('commentData ', entity)
    return await this.prisma.comment.create({
      data: {
        ...entity,
      },
      include: {
        post: true,
      }
    });
  }


  public async update(id: number, commentData: CommentEntity): Promise<Comment> {
    const entity = commentData.toObject();
    return await this.prisma.comment.update({
      where: { id },
      data: { ...entity },
      include: {
        post: true,
      }
    });
  }


  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }

}
