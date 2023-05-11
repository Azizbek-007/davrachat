import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageService } from './message.service';
import { QueryFindMessageDto } from './dto/query-find.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateMsgDto } from './dto/create-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { FileStorage } from './file.staroge';

@ApiTags('message')
@UseGuards(AuthGuard)
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly s3Service: S3Service,
    private eventEmitter: EventEmitter2,
    ) {}

  @Post('/sendMessage')
  async sendMessage (@Body() body: CreateMsgDto, @GetUser() user) {
    const dto = { ...body, senderId: user['sub'] }
    this.eventEmitter.emit('message.create', dto);
    return await this.messageService.CreateMessage(dto);
  }

  @Post('/sendPhoto')
  @UseInterceptors(FileInterceptor('image', FileStorage))
  async sendPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto,  
    @GetUser() user
  ) {
    let aws_s3_location: string;
    file ? (aws_s3_location = await this.s3Service.upload(file)) : null;
    dto['image'] = aws_s3_location;
    const dto_2 = { ...dto, senderId: user['sub'] };
    this.eventEmitter.emit('message.create', dto_2);
    return await this.messageService.CreateMessage(dto_2);
  }


  @Get('user')
  findAll(@Query() query: QueryFindMessageDto, @GetUser() user) {
    return this.messageService.findAll(query, user['sub']);
  }

}
