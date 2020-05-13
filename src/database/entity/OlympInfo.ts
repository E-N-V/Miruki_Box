import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export default class OlympInfo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({
        length: 100
    })
    section!: string

    @Column()
    title!: string

    @Column({
        type: "text"
    })
    except!: string

    @Column({type: "text"})
    description!: string

    @Column({type: "int", default: 900})
    time!: number
    
    @Column({nullable: true})
    path!: string
    
    @Column({nullable: true})
    path_json!: string
}