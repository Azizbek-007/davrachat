import { IsNotEmpty, IsString, Length } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    username: string;
}