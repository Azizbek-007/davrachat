import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
@Module({
  imports: [
    NestRedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'localhost',
        port: 6379,
        password: ''
      }
    }),
  ], 
  providers: [RedisService]
})
export class RedisModule {}
