import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { JWTValidation } from '../validatons/jwt.validation';
import { plainToInstance } from 'class-transformer';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

export default registerAs('jwt', (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_AT_SECRET,
    accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
  };

  const JWTEnvironment = plainToInstance(
    JWTValidation,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    JWTEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});