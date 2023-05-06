import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikeEntity } from './likes.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '@project/shared/app-types';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  public async create(likeData: CreateLikeDto): Promise<Like> {
    const likeEntity = new LikeEntity(likeData);
    return await this.likesRepository.create(likeEntity);
  }

  public destroy(id: number) {
    this.likesRepository.destroy(id);
  }
}
