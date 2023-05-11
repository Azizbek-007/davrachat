import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { QueryFindMessageDto } from './dto/query-find.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('chat')
@UseGuards(AuthGuard)
@Controller('chat')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('user')
  findAll(@Query() query: QueryFindMessageDto, @GetUser() user) {
    return this.messageService.findAll(query, user['sub']);
  }

}
