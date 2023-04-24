import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import dbConfig from './configs/db.config';
import jwtConfig from './configs/jwt.config';
import rabbitConfig from './configs/rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/users/.local.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ appConfig, dbConfig, jwtConfig, rabbitConfig ],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ],
})
export class ConfigUsersModule {}
