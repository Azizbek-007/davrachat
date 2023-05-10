import { IsNumber, IsOptional } from "class-validator";

export class QueryFindMessageDto {
    @IsOptional()
    @IsNumber()
    take: number;

    @IsOptional()
    @IsNumber()
    skip: number;

    @IsNumber()
    senderId: number;

    @IsNumber()
    receiverId: number
}
