import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import crypto from "crypto";

@Injectable()
export class CommentsMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: Comment[] = [];

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async findById(id: string): Promise<Comment> {
    const comment = this.repository.find(item => item._id === id);
    return comment ?? null;
  }

  public async all(params): Promise<Comment[]> {
    return this.repository;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(item => item._id !== id);
  }

  public async update(id: string, commentData: CommentEntity): Promise<Comment> {
    this.repository = this.repository.map(item => {
      if (item._id === id) {
        return { ...commentData.toObject(), _id: id };
      }

      return item;
    });
    return this.findById(id);
  }
}