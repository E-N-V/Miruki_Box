import {Request, Response} from "express"
import {OlympInfo} from "../database/entity/Olymp"
import { getConnection } from "typeorm";

export const OlympList = async (req: Request, res: Response): Promise<any> => {
    let result = await getConnection().getRepository(OlympInfo).find({select: ["section", "title", "excerpt", "description"]})
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