import { Injectable, NotFoundException } from '@nestjs/common';
import {  QueryFindMessageDto } from './dto/query-find.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMsgDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(PrivateMessage)
    private readonly privateMessageRepository: Repository<PrivateMessage>
  ) {}

  async findAll(query: QueryFindMessageDto, senderId: number) {
    const take = query['take'] || 30;
    const skip = query['skip'] || 0;

    const [result, total] = await this.privateMessageRepository.findAndCount(
        {
          relations: {
            sender: true,
            receiver: true
          },
          where: [
            { senderId, receiverId: query['receiverId']}, 
            { senderId: query['receiverId'], receiverId: senderId }
          ],
          order: { createdAt: "DESC" },
          take: take,
          skip: skip
        }
    );

    if (result.length == 0)  {
      throw new NotFoundException("There are no messages in this chat");
    }

    return {
      message: "messages are available",
      payload: result,
      count: total
    }
  }

  async CreateMessage(dto: CreateMsgDto) {
    const msg = this.privateMessageRepository.create(dto);
    const new_msg = await msg.save();
    return { message: "message sent", payload: new_msg };
  }

  async myFriends(user_id: number) {
    const friends = await this.privateMessageRepository.find({
      where: [
        {
          senderId: user_id
        }, {
          receiverId: user_id
        }
      ],
      order: {
        createdAt: "DESC"
      }
    });

    if(friends.length == 0) {
      throw new NotFoundException("Friend not found");
    }
    return { message: "Friends", payload: friends };
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }


  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
