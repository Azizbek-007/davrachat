import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateMessage } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ PrivateMessage ])],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
