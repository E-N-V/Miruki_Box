import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class OlympInfo{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    section!: string

    @Column()
    title!: string

    @Column()
    excerpt!: string

    @Column()
    description!: string
}

@Entity()
export class TablesOlymp{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    url!: string
}