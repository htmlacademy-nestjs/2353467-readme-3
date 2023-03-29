import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import crypto from "crypto";
import { CommentEntity } from './comments.entity';
import dayjs from 'dayjs';

@Injectable()
export class CommentsMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: Comment[] = [];

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID(), createdDate: dayjs().unix() };

    this.repository.push(entry);

    return entry;
  }

  public async findById(id: string): Promise<Comment> {
    const comment = this.repository.find(item => item._id === id);
    return comment ?? null;
  }

  public async list(postID: string): Promise<Comment[]> {
    const comments = this.repository.filter(item => item.postID === postID);
    return comments;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(user => user._id !== id);
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository = this.repository.map(comment => {
      if (comment._id === id) {
        return { ...item.toObject(), _id: id };
      }

      return comment;
    });
    return this.findById(id);
  }
}