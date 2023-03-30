import { Injectable } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { Post } from '@project/shared/app-types';
import { PostsMemoryRepository } from './posts-memory.repository';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsMemoryRepository
  ) { }

  public all() {

  }

  public create(likeData): Promise<Post>  {
    const likeEntity = new PostEntity(likeData)
    return this.postsRepository.create(likeEntity);
  }

  public update() {

  }

  public destroy() {

  }

}
