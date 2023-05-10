import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { QueryFindMessageDto } from './dto/query-find.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('chat')
@UseGuards(AuthGuard)
@Controller('chat')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('user')
  findAll(@Query() query: QueryFindMessageDto) {
    return this.messageService.findAll(query);
  }

}
