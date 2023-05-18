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

    return {
      message: "messages are available",
      payload: result,
      count: total
    }
  }

  async CreateMessage(dto: CreateMsgDto) {
    try {
      const msg = this.privateMessageRepository.create(dto);
      const new_msg = await msg.save();
      return { message: "message sent", payload: new_msg }; 
    } catch (error) {
      throw new NotFoundException("Receiver not found");
    }
  }

  async myFriends(user_id: number): Promise<{ message: string; payload: any[]; }> {
    const friends = await this.privateMessageRepository.find({
      relations: {
        sender: true,
        receiver: true
      },
      select: {
        text: true,
        image: true,
        createdAt: true,
        senderId: true,
        receiverId: true,
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
          status: true
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
          status: true
        }
      },
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
    let filtr = [];
    let payload = [];
    for await (const res of friends) {
      if(filtr.includes(res.receiverId) == false) {
        filtr.push(res.receiverId)

        payload.push({ ...res.receiver, message: {
          text: res['text'],
          createdAt: res['createdAt']
        }});

      }
      if(filtr.includes(res.senderId) == false) {
        filtr.push(res.senderId)
        payload.push({ ...res.sender, message: {
          text: res['text'],
          createdAt: res['createdAt']
        }});
      }
    }

    const desiredObj = await payload.find(item => item.id !== user_id);
    return { message: "Friends", payload: [...desiredObj] };
  }

  async createGroup() {

  }
  
}


const obj = [
  {
    id: 1,
    a: "ok"
  }, {
    id: 2,
    a: "no"
  }
]