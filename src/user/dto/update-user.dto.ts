import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    last_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    bio: string;

    @IsString()
    @IsOptional()
    @Length(4, 16)
    @ApiProperty({ required: false })
    username: string;

}
