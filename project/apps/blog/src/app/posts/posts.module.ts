import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {PostsMemoryRepository} from "./posts-memory.repository";

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsMemoryRepository],
})
export class PostsModule {}
