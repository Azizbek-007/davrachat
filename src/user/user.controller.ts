import { Controller, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';
import { MessageService } from 'src/message/message.service';

@UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User
  ) {
    console.log(updateUserDto)
    return this.userService.update(user['sub'], updateUserDto);
  }

  @Get('friends')
  MyFriends (@GetUser() user: User) {
    return this.messageService.myFriends(user['sub']);
  }
  @Get('search/:username')
  search( 
    @Param('username') username: string
  ){
    return this.userService.search(username);
  }
}
