import { IsString } from 'class-validator';

export enum ValidationMessage {
  AccessTokenSecretIsRequired = 'AccessTokenSecret is required',
  AccessTokenExpiresInIsRequired = 'accessTokenExpiresIn is required',
  RefreshTokenSecretIsRequired = 'RefreshTokenSecret is required',
  RefreshTokenExpiresInIsRequired = 'RefreshTokenExpiresIn is required',
}

export class JWTValidation {
  @IsString({
    message: ValidationMessage.AccessTokenSecretIsRequired,
  })
  public accessTokenSecret: string;

  @IsString({
    message: ValidationMessage.AccessTokenExpiresInIsRequired,
  })
  public accessTokenExpiresIn: string;

  @IsString({
    message: ValidationMessage.AccessTokenSecretIsRequired,
  })
  public refreshTokenSecret: string;

  @IsString({
    message: ValidationMessage.AccessTokenExpiresInIsRequired,
  })
  public refreshTokenExpiresIn: string;
}
