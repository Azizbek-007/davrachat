import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrivateMessage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    text: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    audio: string;

    @Column({ nullable: true })
    replyMessageId: number;

    @Column()
    senderId: number;
    
    @ManyToOne(() => User, user => user.sentMessages)
    sender: User;

    @Column()
    receiverId: number;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver: User;

    @CreateDateColumn()
    createdAt: Date;
}
