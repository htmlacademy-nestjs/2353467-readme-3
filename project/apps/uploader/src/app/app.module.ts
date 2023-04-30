import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';
import { getMongooseOptions } from '@project/util/util-core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('uploader.db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
