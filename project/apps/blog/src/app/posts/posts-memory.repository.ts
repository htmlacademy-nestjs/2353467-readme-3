import { Injectable } from "@nestjs/common";
import { Post } from "@project/shared/app-types";
import { PostLinkEntity, PostPhoteEntity, PostQuoteEntity, PostTextEntity, PostVideoEntity } from "./posts.entity";
import crypto from "crypto";

@Injectable()
export class PostsMemoryRepository {

  private repository: Post[] = [];

  public async create(postData: PostTextEntity | PostVideoEntity | PostPhoteEntity | PostQuoteEntity | PostLinkEntity ): Promise<Post> {
    const entry = { ...postData.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async findById(id: string): Promise<Post> {
    const post = this.repository.find(item => item._id === id);
    return post ?? null;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item._id !== id);
  }

  public async update(id: string, postData: PostTextEntity | PostVideoEntity | PostPhoteEntity | PostQuoteEntity | PostLinkEntity): Promise<Post> {
    this.repository = this.repository.map(item => {
      if (item._id === id) {
        return { ...postData.toObject(), _id: id };
      }

      return item;
    });
    return this.findById(id);
  }

}