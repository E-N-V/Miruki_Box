import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import  User  from "./User";

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
export class Student{
	@PrimaryGeneratedColumn()
	id!: number

	@OneToOne((type) => User)
	@JoinColumn()
	id_usr!: User
}

@Entity()
export class Student_op{
	@PrimaryGeneratedColumn()
	id!: number

	@OneToOne((type) => User)
	@JoinColumn()
	id_usr!: User
}

@Entity()
export class Prepod{
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

	@Column({
		length: 100,
		type: "varchar"
	})
	email!: string

	@OneToOne((type) => User)
	@JoinColumn()
	user!: User
}