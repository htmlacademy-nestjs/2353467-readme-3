import { CRUDRepository } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import crypto from "crypto";

@Injectable()
export class TagsMemoryRepository implements CRUDRepository<TagEntity, string, Tag> {
  private repository: Tag[] = [];

  public async create(tagData: TagEntity): Promise<Tag> {
    const entry = { ...tagData.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async findById(id: string): Promise<Tag> {
    const tag = this.repository.find(item => item._id === id);
    return tag ?? null;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item._id !== id);
  }

  public async update(id: string, tagData: TagEntity): Promise<Tag> {
    this.repository = this.repository.map(item => {
      if (item._id === id) {
        return { ...tagData.toObject(), _id: id };
      }

      return item;
    });
    return this.findById(id);
  }

  public all(): Tag[] {
    return this.repository;
  }
}