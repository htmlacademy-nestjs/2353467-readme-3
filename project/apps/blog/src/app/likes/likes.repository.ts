import { Injectable } from "@nestjs/common";
import { Like } from "@project/shared/app-types";
import { LikeEntity } from "./likes.entity";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesRepository {

  constructor(private readonly prisma: PrismaService) {}

  public async create(likeData: LikeEntity): Promise<Like> {
    return await this.prisma.like.create({
      data: { ...likeData.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }
}