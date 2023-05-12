import { IsNotEmpty, IsString, Length } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 16)
    username: string;
}