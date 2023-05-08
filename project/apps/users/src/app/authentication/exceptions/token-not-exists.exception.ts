import { UnauthorizedException } from '@nestjs/common';

export class TokenNotExistsException extends UnauthorizedException {
  constructor(tokenID: string) {
    super(`Token with ID ${tokenID} does not exists`);
  }
}
