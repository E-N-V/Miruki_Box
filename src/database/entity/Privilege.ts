import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne((type) => User)
	@JoinColumn()
	id_usr!: User;
}

@Entity()
export class Moderator{
	@PrimaryGeneratedColumn()
	id!: number

	@OneToOne((type) => User)
	@JoinColumn()
	id_usr!: User
}

@Entity()
export class Founder{
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	email!: string

	@OneToOne((type) => User)
	@JoinColumn()
	user!: User
}