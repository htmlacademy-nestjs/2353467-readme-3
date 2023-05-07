import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UploaderValidation } from '../validations/uploader.validation';


const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;

export interface UploaderConfig {
  serveRoot: string;
  environment: string;
  uploadDirectory: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

export default registerAs('uploader', (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
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