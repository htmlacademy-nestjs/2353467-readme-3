import { Module } from '@nestjs/common';
import { CommentsMemoryRepository } from './comments-memory.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [ CommentsController ],
  providers: [ CommentsService, CommentsMemoryRepository ],
})
export class CommentsModule {}
