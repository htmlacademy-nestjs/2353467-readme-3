import { CRUDRepository } from '@project/util/util-types';
import { UserEntity } from './user.entity';
import { User } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import crypto from "crypto";

@Injectable()
export class UserMemoryRepository implements CRUDRepository<UserEntity, string, User> {
  private repository: User[] = [];

  public async create(item: UserEntity): Promise<User> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository.push(entry);
    return entry;
  }

  public async find(id: string): Promise<User> {
    const user = this.repository.find(user => user._id === id);
    return user ?? null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.repository.find(user => user.email === email);
    return user ?? null;
  }

  public async destroy(id: string): Promise<void> {
    this.repository = this.repository.filter(user => user._id !== id);
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    this.repository.map(user => {
      if (user._id === id) {
        return { ...item.toObject(), _id: id };
      }

      return user;
    });
    return this.find(id);
  }
}
