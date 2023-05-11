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
      data: result,
      count: total
    }
  }

  async CreateMessage(dto: CreateMsgDto) {
    const msg = this.privateMessageRepository.create(dto);
    return await msg.save();
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
      
    });
    
    const data = await this.privateMessageRepository
    .createQueryBuilder()
    .groupBy('senderId')
    .addGroupBy('receiverId')
    .getMany()
    return data
    // if(friends.length == 0) {
    //   throw new NotFoundException("Friend not found")
    // }
    // return friends
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }


  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
