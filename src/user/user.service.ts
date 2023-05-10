import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`)
    }
    this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
