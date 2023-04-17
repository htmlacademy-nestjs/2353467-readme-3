import { Injectable } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { Tag } from '@project/shared/app-types';
import { fillObject } from '@project/util/util-core';

@Injectable()
export class TagsService {

  constructor(
    private readonly tagsRepository: TagsRepository
  ) { }

  public async findAll(): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAll();
    return tags.map(item => fillObject(TagRdo, item));
  }

  public async find(id: number): Promise<Tag | null> {
    const tag = await this.tagsRepository.find(id);
    return fillObject(TagRdo, tag);
  }

  public async create(tagData: CreateTagDto): Promise<Tag> {
    const tagEntity = new TagEntity(tagData);
    const tag = await this.tagsRepository.create(tagEntity);
    return fillObject(TagRdo, tag);
  }

  public async update(id: number, tagData: CreateTagDto): Promise<Tag> {
    const tagEntity = new TagEntity(tagData);
    const tag = await this.tagsRepository.update(id, tagEntity);
    return fillObject(TagRdo, tag);
  }

  public async destroy(id: number): Promise<void> {
    this.tagsRepository.destroy(id);
  }
}
