import { IsNumberString, IsOptional } from "class-validator";

export class QueryFindMessageDto {
    @IsOptional()
    @IsNumberString()
    take: number;

    @IsOptional()
    @IsNumberString()
    skip: number;

    @IsNumberString()
    receiverId: number
}
