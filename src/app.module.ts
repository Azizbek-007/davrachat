import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MessageModule } from './message/message.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { S3Module } from './s3/s3.module';
import { GroupModule } from './group/group.module';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
      logging: false
    }),
    EventEmitterModule.forRoot(),
    MailModule,
    RedisModule,
    AuthModule,
    UserModule,
    MessageModule,
    S3Module,
    GroupModule,
    FileModule,
  ],
  controllers: [],
})
export class AppModule {}
 