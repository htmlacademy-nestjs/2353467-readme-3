import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikeEntity } from './likes.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from '@project/shared/app-types';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  public async find(id: number): Promise<Like[] | null> {
    return await this.likesRepository.find(id);
  }

  public async create(likeData: CreateLikeDto): Promise<Like> {
    const likeEntity = new LikeEntity(likeData);
    return await this.likesRepository.create(likeEntity);
  }

  public destroy(id: number): void {
    this.likesRepository.destroy(id);
  }
}
