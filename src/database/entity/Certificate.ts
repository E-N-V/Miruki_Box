import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import  User  from "./User"
import OlympInfo from "./OlympInfo"

@Entity()
export default class Certificate extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne((type) => User)
    @JoinColumn()
    uid!: User

    @OneToOne((type) => OlympInfo)
    @JoinColumn()
    oid!: OlympInfo
}