import { Injectable } from '@nestjs/common';
import { LikesMemoryRepository } from './likes-memory.repository';
import { LikeEntity } from './likes.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {

  constructor(
    private readonly likesRepository: LikesMemoryRepository
  ) { }

  public async create(like: CreateLikeDto) {
    const likeEntity = await new LikeEntity(like)
    return this.likesRepository.create(likeEntity);
  }

  public async destroy(id: string) {
    return this.likesRepository.destroy(id);
  }

  public async count(postID: string) {
    return await this.likesRepository.count(postID);
  }
}
