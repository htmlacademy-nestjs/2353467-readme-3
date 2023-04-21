import { CRUDRepository } from '@project/util/util-types';
import { Comment, CommentConditions } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './comments.query';

@Injectable()
export class CommentsRepository implements CRUDRepository<CommentEntity, number, Comment> {

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(params: CommentQuery): Promise<Comment[]> {
    const where: CommentConditions = {};

    if (params.users) {
      where.userID = {
        in: params.users
      };
    }

    if (params.posts) {
      where.postID = {
        in: params.posts
      };
    }

    return this.prisma.comment.findMany({
      where: where,
      take: params.limit,
      include: {
        post: true,
      }
    });
  }

  public async find(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: { id },
      include: {
        post: true,
      }
    });
  }

  public async create(commentData: CommentEntity): Promise<Comment> {
    const entity = commentData.toObject();
    return this.prisma.comment.create({
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
    return this.prisma.comment.update({
      where: { id },
      data: { ...entity },
      include: {
        post: true,
      }
    });
  }


  public async destroy(id: number): Promise<void> {
    this.prisma.comment.delete({
      where: { id },
    });
  }

}
