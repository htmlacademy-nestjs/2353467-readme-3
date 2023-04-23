import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NotifyValidation } from '../validations/notify.validation';

const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;
const DEFAULT_RABBIT_PORT = 5672;

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  }
}

export default registerAs('application', (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    }
  };

  const notifyEnvironment = plainToInstance(
    NotifyValidation,
    config,
    { enableImplicitConversion: true }
  );

  const errors = validateSync(
    notifyEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});