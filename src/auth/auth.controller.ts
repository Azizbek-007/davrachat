import { Controller, Get, Post, Body, Headers, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CodeDto } from './dto/code.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    ) {}

  // @Throttle(3, 60)
  @Post('login')
  @HttpCode(200)
  async create(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }
  

  @Post('check')
  @HttpCode(HttpStatus.OK)
  async check(@Body() dto: CodeDto) {
    return this.authService.check(dto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return this.authService.getUser(req['user']['email'])
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @HttpCode(204)
  logout(@Headers('authorization') bearerToken: string) {
    const token = bearerToken.split(' ')[1];
    return this.authService.logout(token);
  }
}
