import { Injectable } from "@nestjs/common";
import { PostConditions } from "@project/shared/app-types";
import { PostEntity } from "./posts.entity";
import { PrismaService } from "../prisma/prisma.service";
import { PostQuery } from './posts.query';

@Injectable()
export class PostsRepository {

  constructor(private readonly prisma: PrismaService) {}

  // Get all posts with params

  public async findAll(params: PostQuery) {
    const where: PostConditions = {};

    if (params.tags) {
      where.tags = {
        some: {
          id: {
            in: params.tags
          }
        }
      };
    }

    if (params.types) {
      where.type = {
        in: params.types
      };
    }

    if (params.users) {
      where.userID = {
        in: params.users
      };
    }

    return this.prisma.post.findMany({
      where: where,
      take: params.limit,
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
      orderBy: [
        { createdAt: params.sort }
      ],
      skip: params.page > 0 ? params.limit * (params.page - 1) : undefined,
    });
  }

  // Find post by ID

  public async find(id: number) {
    return this.prisma.post.findFirst({
      where: { id },
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
    });
  }

  // Create post

  public async create(postData: PostEntity ) {
    const entity = postData.toObject();
    return this.prisma.post.create({
      data: { ...entity }
    });
  }

  // Update post

  public async update(id: number, postData: PostEntity) {
    const entity = postData.toObject();
    return this.prisma.post.update({
      where: { id },
      data: { ...entity },
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
    });
  }

  // Remove post

  public async destroy(id: number): Promise<void> {
    this.prisma.post.delete({
      where: { id },
    });
  }

}
