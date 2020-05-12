import {Request, Response} from "express"
import {OlympInfo} from "../database/entity/Olymp"
import { getConnection } from "typeorm";

export const OlympList = async (req: Request, res: Response): Promise<any> => {
    let search = new OlympInfo()
    search.section = req.query.section.toString()
    let result = await getConnection().getRepository(OlympInfo).find(search)
    console.log(result)
    return res.render("olympSelection", { title: "Выбор олимпиад",  olymp: result });
}

export const OlympWalk = async (req: Request, res: Response): Promise<any> => {
    return res.render("olympWalkthrough", { title: "Прохождение" });
}

export const OlympCreate = async (req: Request, res: Response): Promise<any> => {
    return res.render("olympConstructor", { title: "Создание олимпиады" });
}

export const OlympResult = async (req: Request, res: Response): Promise<any> => {
    return res.render("testResult", {title: "Результат"});
}