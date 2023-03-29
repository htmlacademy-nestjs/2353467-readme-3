import { Injectable } from "@nestjs/common";
import { Like } from "@project/shared/app-types";
import { LikeEntity } from "./likes.entity";
import crypto from "crypto";

@Injectable()
export class LikesMemoryRepository {
  private repository: Like[] = [];

  public async create(item: LikeEntity): Promise<Like> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async destroy(likeID: string): Promise<void> {
    this.repository = this.repository.filter(like => like._id !== likeID);
  }

  public async count(postID: string): Promise<number> {
    return this.repository.filter(like => like.postID === postID).length;
  }
}