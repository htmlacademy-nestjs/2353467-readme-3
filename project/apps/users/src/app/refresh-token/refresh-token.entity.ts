import { Entity } from '@project/util/util-types';
import { Token } from '@project/shared/app-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public id?: string;
  public tokenID: string;
  public userID: string;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.userID = refreshToken.userID;
    this.id = refreshToken.id;
    this.tokenID = refreshToken.tokenID;
    this.expiresIn = refreshToken.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}
