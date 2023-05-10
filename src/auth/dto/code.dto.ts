import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber } from "class-validator";

export class CodeDto {
    @IsNumber()
    @ApiProperty()
    readonly code: number;

    @IsEmail()
    @ApiProperty()
    readonly email: string;
}