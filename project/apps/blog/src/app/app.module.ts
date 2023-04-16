import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [ PostsModule, CommentsModule, TagsModule, LikesModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
