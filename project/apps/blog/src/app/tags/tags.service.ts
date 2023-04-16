import { Injectable } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from '@project/shared/app-types';

@Injectable()
export class TagsService {

  constructor(
    private readonly tagsRepository: TagsRepository
  ) { }

  public findAll(): Tag[] {
    return this.tagsRepository.findAll();
  }

  public create(tagData: CreateTagDto): Promise<Tag> {
    const tagEntity = new TagEntity(tagData);
    return this.tagsRepository.create(tagEntity);
  }

  public update(id: number, tagData: CreateTagDto): Promise<Tag> {
    const tagEntity = new TagEntity(tagData);
    return this.tagsRepository.update(id, tagEntity);
  }

  public destroy(id: number) {
    this.tagsRepository.destroy(id);
  }
}
