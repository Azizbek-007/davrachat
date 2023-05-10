import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { RedisService } from 'src/redis/redis.service';
import { CodeDto } from './dto/code.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly appService: MailService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    ) {}


  async login(dto: LoginDto): Promise<void> {
    const isEmail = await this.redisService.get(dto['email']);
    if (isEmail != null) {
      throw new BadRequestException('You must wait 90 seconds to log in again');
    }
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    await this.appService.sendMail(dto['email'], code);
    const timer = parseInt(process.env.SMTP_CODE_TTL);
    await this.redisService.set(dto['email'], code.toString(),  timer);
    throw new HttpException({ status: 200, message: "Code sended to user email", timer }, HttpStatus.OK);
  }

  async check(dto: CodeDto) {
    const isEmail = await this.redisService.get(dto['email']);
    if(isEmail && isEmail == dto['code'].toString()) {
      await this.redisService.del(dto['email']);
      const findUser = await this.userService.findByUserEmail(dto['email']);
      if(findUser == false) {
        const newUser = await this.userService.createUserWithEmail(dto['email']);
        const payload = { email: newUser['email'], sub: newUser['id'] };
        return {
          ...newUser,
          access_token: await this.jwtService.signAsync(payload),
        };
      }else {
        const payload = { email: findUser['email'], sub: findUser['id'] };
        return {
          ...findUser,
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }else {
      throw new BadRequestException('Code does not match');
    }
  }

  async getUser(email: string) {
    return await this.userService.findByUserEmail(email);
  }

  async logout(token: string) {
    return await this.jwtService.verify(token);
  }


}


