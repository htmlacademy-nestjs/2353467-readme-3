import { Injectable } from "@nestjs/common";
import { IPost } from "@project/shared/app-types";
import { PostEntity } from "./posts.entity";
import { PrismaService } from "../prisma/prisma.service";
import { CRUDRepository } from "@project/util/util-types";

@Injectable()
export class PostsRepository implements CRUDRepository<PostEntity, number, IPost> {

  constructor(private readonly prisma: PrismaService) {}

  // Get all posts with params

  public async findAll(params): Promise<IPost[]> {
    return await this.prisma.post.findMany();
  }

  // Create post

  public async create(postData: PostEntity ): Promise<IPost | null> {
    return await this.prisma.post.create({
      data: { ...postData.toObject() },
    });
  }

  // Update post

  public async update(id: number, postData: PostEntity): Promise<IPost | null> {
    return await this.prisma.post.update({
      where: { id },
      data: { ...postData.toObject() },
    });
  }

  // Find post by ID

  public async find(id: number): Promise<IPost | null> {
    return await this.prisma.post.findFirst({
      where: { id },
    });
  }


  // Remove post

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }
/*
  public async test(id) {
    await this.prisma.post.findFirst({
      where: { id },
    });
  }
*/
}
