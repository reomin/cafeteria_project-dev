import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
