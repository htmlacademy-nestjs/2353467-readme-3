import { Injectable } from "@nestjs/common";
import { Like } from "@project/shared/app-types";
import { LikeEntity } from "./likes.entity";
import crypto from "crypto";

@Injectable()
export class LikesMemoryRepository {
  private repository: Like[] = [];

  public async create(likeData: LikeEntity): Promise<Like> {
    const entry = { ...likeData.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item._id !== id);
  }

  public async count(postID: string): Promise<number> {
    const likes = this.repository.filter(item => item.postID === postID);
    return likes.length;
  }
}