import { UserRole } from './user-role.enum';

export interface Token {
  id?: string;
  tokenID: string;
  createdAt: Date;
  userID: string;
  expiresIn: Date;
}
export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  lastname: string;
  firstname: string;
}

export interface RefreshTokenPayload {
  id: string;
  tokenID: string;
}
