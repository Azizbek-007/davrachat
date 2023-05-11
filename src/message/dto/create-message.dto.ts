import { User } from "src/user/entities/user.entity";
import { SaveOptions, RemoveOptions } from "typeorm";
import { PrivateMessage } from "../entities/message.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMsgDto  {

    @IsOptional()
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    audio: string;

    @IsOptional()
    @IsNumber()
    replyMessageId: number;

    @IsNumber()
    receiverId: number;

    @IsNumber()
    senderId: number;
} 