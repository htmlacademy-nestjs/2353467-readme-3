import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { IPost, PostConditions } from '@project/shared/app-types';
import { PostEntity } from './posts.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './posts.query';

@Injectable()
export class PostsRepository
  implements CRUDRepository<PostEntity, number, IPost>
{
  constructor(private readonly prisma: PrismaService) {}

  // Get all posts with params

  public async findAll(params: PostQuery): Promise<IPost[] | null> {
    const where: PostConditions = {};

    if (params.tags) {
      where.tags = {
        some: {
          id: {
            in: params.tags,
          },
        },
      };
    }

    if (params.types) {
      where.type = {
        in: params.types,
      };
    }

    if (params.users) {
      where.userID = {
        in: params.users,
      };
    }

    return this.prisma.post.findMany({
      where,
      take: params.limit,
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
      orderBy: [{ createdAt: params.sort }],
      skip: params.page > 0 ? params.limit * (params.page - 1) : undefined,
    });
  }

  // Find post by ID

  public async find(id: number): Promise<IPost | null> {
    const post = this.prisma.post.findFirst({
      where: { id },
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
    });

    return post;
  }

  // Create post

  public async create(postData: PostEntity): Promise<IPost> {
    const entity = postData.toObject();
    return this.prisma.post.create({
      data: { ...entity },
    });
  }

  // Update post

  public async update(id: number, postData: PostEntity): Promise<IPost> {
    const entity = postData.toObject();
    const post = this.prisma.post.update({
      where: { id },
      data: { ...entity },
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
    });

    return post;
  }

  // Remove post

  public async destroy(id: number): Promise<void> {
    this.prisma.post.delete({
      where: { id },
    });
  }

  // Repost

  public async repost(id: number): Promise<void> {
    const post = await this.prisma.post.findFirst({
      where: { id },
    });

    this.prisma.post.create({
      data: { ...post, userID: 's', originalUserID: post.userID },
    });
  }
}
