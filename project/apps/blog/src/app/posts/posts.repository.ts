import { Injectable } from "@nestjs/common";
import { IPost } from "@project/shared/app-types";
import { PostEntity } from "./posts.entity";
import { PrismaService } from "../prisma/prisma.service";
import { CRUDRepository } from "@project/util/util-types";
import { PostQuery } from './posts.query';

@Injectable()
export class PostsRepository implements CRUDRepository<PostEntity, number, IPost> {

  constructor(private readonly prisma: PrismaService) {}

  // Get all posts with params

  public async findAll(params: PostQuery): Promise<IPost[]> {
    return this.prisma.post.findMany({
      where: {
        userID: {
          in: params.users
        },
        tags: {
          some: {
            id: {
              in: params.tags
            }
          }
        }
      },
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

  public async find(id: number): Promise<IPost> {
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

  public async create(postData: PostEntity ): Promise<IPost | null> {
    const entity = postData.toObject();
    return this.prisma.post.create({
      data: { ...entity },
      include: {
        comments: true,
        tags: true,
        likes: true,
      },
    });
  }

  // Update post

  public async update(id: number, postData: PostEntity): Promise<IPost | null> {
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
