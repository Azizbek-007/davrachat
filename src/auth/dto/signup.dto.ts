import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUp {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly first_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly last_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly avatar: string;
}
