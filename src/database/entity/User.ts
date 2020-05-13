import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export default class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    f_name!: string;

    @Column()
    s_name!: string;

    @Column()
    t_name!: string;

    @Column({
        length: 100,
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

}
