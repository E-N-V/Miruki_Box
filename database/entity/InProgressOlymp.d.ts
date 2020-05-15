import { BaseEntity } from "typeorm";
export default class InProgressOlymp extends BaseEntity {
    id: number;
    uid: number;
    oid: number;
    time_start: string;
    date: string;
}
