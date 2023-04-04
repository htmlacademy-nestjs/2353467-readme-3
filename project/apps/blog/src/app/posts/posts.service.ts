import { Injectable } from '@nestjs/common';
import { PostTextEntity } from './posts.entity';
import { Post } from '@project/shared/app-types';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsMemoryRepository } from './posts-memory.repository';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsMemoryRepository
  ) { }

  public all() {

  }

  public create(postData: CreatePostDto): Promise<Post>  {
    const postEntity = new PostTextEntity(postData)
    return this.postsRepository.create(postEntity);
  }

  public update(id: string, postData: CreatePostDto) {
    const postEntity = new PostTextEntity(postData);
    return this.postsRepository.update(id, postEntity);
  }

  public destroy() {

  }

}
