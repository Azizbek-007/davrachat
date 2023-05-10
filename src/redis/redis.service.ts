import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {

    constructor(@InjectRedis() private readonly redisService: Redis) {}

    async set(key: string, value: string, ttl: number): Promise<"OK"> {
        return this.redisService.set(key, value, 'EX', ttl);
    }

    async get(key: string): Promise<string> {
        return this.redisService.get(key)
    }

    async del (key: string): Promise<number> {
        return this.redisService.del(key)
    }
}
