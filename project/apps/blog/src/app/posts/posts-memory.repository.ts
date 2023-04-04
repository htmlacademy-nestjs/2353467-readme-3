import { Injectable } from "@nestjs/common";
import { IPost } from "@project/shared/app-types";
import { PostEntity } from "./posts.entity";
import crypto from "crypto";

@Injectable()
export class PostsMemoryRepository {

  private repository: IPost[] = [];

  // Get all posts with params

  public async all(params): Promise<IPost[]> {
    return this.repository;
  }

  // Create post

  public async create(postData: PostEntity ): Promise<IPost> {
    const entry = { ...postData.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  // Update post

  public async update(id: string, postData: PostEntity): Promise<IPost> {
    this.repository = this.repository.map(item => {
      if (item._id === id) {
        return { ...postData.toObject(), _id: id };
      }

      return item;
    });
    return this.findById(id);
  }

  // Find post by ID

  public async findById(id: string): Promise<IPost> {
    const post = this.repository.find(item => item._id === id);
    return post ?? null;
  }


  // Remove post

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item._id !== id);
  }

}
