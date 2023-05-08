import { TokenPayload, User } from '@project/shared/app-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    lastname: user.lastname,
    firstname: user.firstname,
  };
}
