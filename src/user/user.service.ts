import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }
    try {
      this.userRepository.merge(user, dto);
      const payload = await this.userRepository.save(user);
      return { message: "successfully updated", payload }
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async myFrineds(user_id: User['id']) {
    const user = await this.userRepository.find({
      where: [
        {
          
        }
      ]


      
    })
  }

  async search(username: string) {
    const user = await this.userRepository.find({
      where: {
        username: ILike(username + '%')
      },
      take: 5
    });
    return {message: 'users are available', payload: user };
  }

  async setAvatar (user_id: number, image_path: string) {
    if(image_path == null) {
      throw new BadRequestException();
    }
    const user = await this.userRepository.findOneBy({ id: user_id });
    this.userRepository.merge(user, { 
      avatar: image_path
    });
    const payload = await this.userRepository.save(user);
    return { message: "image uploaded successfully", payload }
  }

  async getUserById (id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
