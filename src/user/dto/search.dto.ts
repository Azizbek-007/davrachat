import { IsNotEmpty, IsString, Length } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    @Length(1, 16)
    username: string;
}