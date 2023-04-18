import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { UploaderValidation } from './uploader.validation';
import { plainToInstance } from 'class-transformer';

const DEFAULT_PORT = 3000;

export interface UploaderConfig {
  environment: string;
  uploadDirectory: string;
  port: number;
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  };

  const uploaderEnvironment = plainToInstance(
    UploaderValidation,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    uploaderEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});