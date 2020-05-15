import { BaseEntity } from "typeorm";
export default class OlympInfo extends BaseEntity {
    id: number;
    section: string;
    title: string;
    except: string;
    description: string;
    time: number;
    path: string;
    path_json: string;
}
