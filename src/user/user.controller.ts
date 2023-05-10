import { Controller, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';

@UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User
  ) {
    return this.userService.update(user['id'], updateUserDto);
  }

  @Get('search/:username')
  search( 
    @Param('username') username: string
  ){
    return this.userService.search(username);
  }
}
