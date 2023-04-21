import { IsString } from 'class-validator';


export enum ValidationMessage {
  AccessTokenSecretIsRequired = 'AccessTokenSecret is required',
  AccessTokenExpiresInIsRequired = 'accessTokenExpiresIn is required',
}

export class JWTValidation {
  @IsString({
    message: ValidationMessage.AccessTokenSecretIsRequired
  })
  public accessTokenSecret: string;

  @IsString({
    message: ValidationMessage.AccessTokenExpiresInIsRequired
  })
  public accessTokenExpiresIn: string;

}
