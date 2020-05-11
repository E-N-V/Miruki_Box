import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    f_name!: string;

    @Column()
    s_name!: string;

    @Column()
    t_name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

}
