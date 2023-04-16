import { Injectable } from '@nestjs/common';
import { IPost } from '@project/shared/app-types';
import { PostsRepository } from './posts.repository';
import { PostConnectionsTypes } from "./posts-connections-types";

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsRepository
  ) { }

  private getConnectionType(type) {
    return PostConnectionsTypes.find(connectionType => connectionType.type === type);
  }

  // Get all posts

  public findAll(params): Promise<IPost[]>  {
    return this.postsRepository.findAll(params);
  }

  // Create post

  public async create(postData): Promise<IPost>  {
    const connectionType = this.getConnectionType(postData.type);
    const postEntity = new connectionType.entity(postData);
    return await this.postsRepository.create(postEntity);
  }

  // Update post

  public update(id: number, postData) {
    const connectionType = this.getConnectionType(postData.type);
    const postEntity = new connectionType.entity(postData);
    return this.postsRepository.update(id, postEntity);
  }

  // Remove post

  public destroy(id: number) {
    this.postsRepository.destroy(id);
  }


}
