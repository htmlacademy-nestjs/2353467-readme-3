import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './configs/notify.config';

const ENV_FILE_PATH = 'apps/notify/.local.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ notifyConfig ],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigNotifyModule {}