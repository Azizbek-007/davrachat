import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, ILike } from 'typeorm';
import { PrivateMessage } from '../message/entities/message.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByUserEmail (email: string): Promise<false | User> {
    const user = await this.userRepository.findOneBy({ email });
    if(user == null){
      return false;
    }
    return user
  }

  async createUserWithEmail(email: string): Promise<User> {
    const new_user = this.userRepository.create({ email });
    return await new_user.save();
  }

  async UserStatus(user_id: number, status: boolean) {
    await this.userRepository.update(user_id, { status });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }

    return this.userRepository.update(user['id'], updateUserDto);
  }

  async myFrineds(user_id: User['id']) {
    const user = await this.userRepository.find({
      where: [{
        
      }]
    })
  }

  async search(username: string) {
    const user = await this.userRepository.find({
      where: {
        username: ILike(username + '%')
      },
      take: 5
    });
    if(user.length == 0) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserById (id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
