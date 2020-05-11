import {  Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class OlympInfo{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    section!: string

    @Column()
    title!: string

    @Column()
    except!: string

    @Column()
    description!: string
}