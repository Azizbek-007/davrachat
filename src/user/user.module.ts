import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PrivateMessage } from '../message/entities/message.entity';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ User, PrivateMessage ])],
  controllers: [UserController],
  providers: [UserService, MessageService]
})
export class UserModule {}
