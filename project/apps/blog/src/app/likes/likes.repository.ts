import { Injectable } from '@nestjs/common';
import { Like } from '@project/shared/app-types';
import { LikeEntity } from './likes.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(likeData: LikeEntity): Promise<Like> {
    const entity = likeData.toObject();
    return this.prisma.like.create({
      data: { ...entity },
    });
  }

  public async destroy(id: number): Promise<void> {
    this.prisma.comment.delete({
      where: { id },
    });
  }
}
