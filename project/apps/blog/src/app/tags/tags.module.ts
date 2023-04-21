import { Module } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [ TagsController ],
  providers: [ TagsService, TagsRepository, PrismaService ],
})
export class TagsModule {}
