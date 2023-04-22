import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('uploader.db.user'),
          password: config.get<string>('uploader.db.password'),
          host: config.get<string>('uploader.db.host'),
          port: config.get<string>('uploader.db.port'),
          authDatabase: config.get<string>('uploader.db.authBase'),
          databaseName: config.get<string>('uploader.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}