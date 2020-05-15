import { BaseEntity } from "typeorm";
export default class User extends BaseEntity {
    id: number;
    f_name: string;
    s_name: string;
    t_name: string;
    email: string;
    password: string;
}
