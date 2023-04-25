import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import uploaderConfig from './configs/uploader.config';

const ENV_FILE_PATH = 'apps/uploader/.local.env';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ uploaderConfig ],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigUploaderModule {}
