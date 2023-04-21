import { Module } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ CommentsController ],
  providers: [ CommentsService, CommentsRepository, PrismaService ],
})
export class CommentsModule {}
