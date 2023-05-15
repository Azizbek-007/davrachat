import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    bio: string;

    @Column()
    avatar: string;

    @OneToMany(() => User, (user) => user.myGroup)
    author: User;
}
