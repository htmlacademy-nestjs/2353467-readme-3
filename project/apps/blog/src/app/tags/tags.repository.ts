import { CRUDRepository } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import dayjs from "dayjs";

@Injectable()
export class TagsRepository implements CRUDRepository<TagEntity, number, Tag> {
  private repository: Tag[] = [];

  public async create(tagData: TagEntity): Promise<Tag> {
    const entry = { ...tagData.toObject(), id: dayjs().unix() };
    this.repository.push(entry);
    return entry;
  }

  public async find(id: number): Promise<Tag> {
    const tag = this.repository.find(item => item.id === id);
    return tag ?? null;
  }

  public async destroy(id: number): Promise<void> {
    this.repository = this.repository.filter(item => item.id !== id);
  }

  public async update(id: number, tagData: TagEntity): Promise<Tag> {
    this.repository = this.repository.map(item => {
      if (item.id === id) {
        return { ...tagData.toObject(), id: id };
      }

      return item;
    });
    return this.find(id);
  }

  public findAll(): Tag[] {
    return this.repository;
  }
}