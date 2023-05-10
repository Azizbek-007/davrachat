import { PrivateMessage } from "src/message/entities/message.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true,  })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true, unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => PrivateMessage, msg => msg.sender)
    sentMessages: PrivateMessage

    @OneToMany(() => PrivateMessage, msg => msg.receiver)
    receivedMessages: PrivateMessage

    @CreateDateColumn()
    createdAt: Date;
}
