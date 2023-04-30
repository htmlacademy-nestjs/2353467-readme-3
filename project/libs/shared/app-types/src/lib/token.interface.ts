import { UserRole } from './user-role.enum';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  lastname: string;
  firstname: string;
}
