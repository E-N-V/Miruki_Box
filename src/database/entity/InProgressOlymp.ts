import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm"

@Entity()
export default class InProgressOlymp extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    uid!: number

    @Column()
    oid!: number

    @Column()
    time_start!: string

    @Column()
    date!: string
}