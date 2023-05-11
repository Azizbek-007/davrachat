import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateMessage } from './entities/message.entity';
import MessageGateway from './message.gateway';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([ PrivateMessage, User ])],
  controllers: [MessageController],
  providers: [MessageService, UserService, MessageGateway, S3Service]
})
export class MessageModule {}
