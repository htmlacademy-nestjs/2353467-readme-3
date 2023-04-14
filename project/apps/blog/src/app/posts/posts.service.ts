import { Injectable } from '@nestjs/common';
import { IPost } from '@project/shared/app-types';
import { PostsMemoryRepository } from './posts-memory.repository';
import { PostConnectionsTypes } from "./posts-connections-types";

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsMemoryRepository
  ) { }

  private getConnectionType(type) {
    return PostConnectionsTypes.find(connectionType => connectionType.type === type);
  }

  // Get all posts

  public all(params): Promise<IPost[]>  {
    return this.postsRepository.all(params);
  }

  // Create post

  public async create(postData): Promise<IPost>  {
    const connectionType = this.getConnectionType(postData.type);
    const postEntity = new connectionType.entity(postData)
      .setCreatedAt()
      .setUpdatedAt();
    return await this.postsRepository.create(postEntity);
  }

  // Update post

  public update(id: string, postData) {
    const connectionType = this.getConnectionType(postData.type);
    const postEntity = new connectionType.entity(postData)
      .setUpdatedAt();
    return this.postsRepository.update(id, postEntity);
  }

  // Remove post

  public destroy(id: string) {
    this.postsRepository.destroy(id);
  }

}
