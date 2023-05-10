import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    last_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    username: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    avatar: string;

}
