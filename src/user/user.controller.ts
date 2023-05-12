import { Controller, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Post, Get, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';
import { MessageService } from 'src/message/message.service';
import { FileStorage } from 'src/message/file.staroge';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { SearchDto } from './dto/search.dto';

@UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly s3Service: S3Service,
  ) {}

  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User
  ) {
    console.log(updateUserDto)
    return this.userService.update(user['sub'], updateUserDto);
  }

  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar', FileStorage))
  async SetAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any
  ) {
    let aws_s3_location: string;
    file ? (aws_s3_location = await this.s3Service.upload(file)) : null;
    return this.userService.setAvatar(user['sub'], aws_s3_location);
  }
  @Get('friends')
  MyFriends (@GetUser() user: User) {
    return this.messageService.myFriends(user['sub']);
  }

  @Get()
  search( 
    @Query('search') username: string
  ){
    return this.userService.search(username);
  }
}
