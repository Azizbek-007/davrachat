import { Injectable, NotFoundException } from '@nestjs/common';
import {  QueryFindMessageDto } from './dto/query-find.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(PrivateMessage)
    private readonly privateMessageRepository: Repository<PrivateMessage>
  ) {}

  async findAll(query: QueryFindMessageDto, senderId: number) {
    const take = query['take'] || 30
    const skip = query['skip'] || 0

    const [result, total] = await this.privateMessageRepository.findAndCount(
        {
          where: { senderId, receiverId: query['receiverId'] },
          order: { id: "DESC" },
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
  findOne(id: number) {
    return `This action returns a #${id} message`;
  }


  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
