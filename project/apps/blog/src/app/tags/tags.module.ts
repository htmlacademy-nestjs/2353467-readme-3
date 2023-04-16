import { Module } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [ TagsController ],
  providers: [ TagsService, TagsRepository ],
})
export class TagsModule {}
