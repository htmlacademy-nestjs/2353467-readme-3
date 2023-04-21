import { CRUDRepository } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsRepository implements CRUDRepository<TagEntity, number, Tag> {

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      include: {
        posts: true,
      }
    });
  }

  public async find(id: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: { id },
      include: {
        posts: true,
      }
    });
  }

  public async create(tagData: TagEntity): Promise<Tag> {
    const entity = tagData.toObject();
    return this.prisma.tag.create({
      data: {
        ...entity,
      },
      include: {
        posts: true,
      }
    });
  }

  public async update(id: number, tagData: TagEntity): Promise<Tag> {
    const entity = tagData.toObject();
    return this.prisma.tag.update({
      where: { id },
      data: { ...entity },
      include: {
        posts: true,
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: { id },
    });
  }


}
