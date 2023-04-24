import { Injectable } from '@nestjs/common';
import { IPost } from '@project/shared/app-types';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFactory } from './posts.factory';
import { PostQuery } from './posts.query';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsRepository
  ) { }

  public async findAll(params: PostQuery): Promise<IPost[]>  {
    const posts = await this.postsRepository.findAll(params);
    return posts.map((post) => {
      const postFactory = new PostFactory();
      return postFactory.getRDO(post);
    });
  }

  public async find(id: number): Promise<IPost>  {
    const post = await this.postsRepository.find(id);
    const postFactory = new PostFactory();
    return postFactory.getRDO(post);
  }

  public async create(postData: CreatePostDto): Promise<IPost>  {
    const postFactory = new PostFactory();
    const entity = postFactory.getEntity(postData);
    const post = await this.postsRepository.create(entity);
    return postFactory.getRDO(post)
  }

  public async update(id: number, postData: CreatePostDto): Promise<IPost>  {
    const postFactory = new PostFactory();
    const entity = postFactory.getEntity(postData);
    const post = await this.postsRepository.update(id, entity);
    return postFactory.getRDO(post)
  }

  public destroy(id: number): void {
    this.postsRepository.destroy(id);
  }
}
