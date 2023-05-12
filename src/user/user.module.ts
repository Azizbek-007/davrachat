import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PrivateMessage } from '../message/entities/message.entity';
import { MessageService } from 'src/message/message.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([ User, PrivateMessage ])],
  controllers: [UserController],
  providers: [UserService, MessageService, S3Service]
})
export class UserModule {}
