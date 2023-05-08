import { Module } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, PrismaService],
})
export class LikesModule {}
