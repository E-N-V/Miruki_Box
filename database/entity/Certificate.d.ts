import { BaseEntity } from "typeorm";
import User from "./User";
import OlympInfo from "./OlympInfo";
export default class Certificate extends BaseEntity {
    id: number;
    uid: User;
    oid: OlympInfo;
}
