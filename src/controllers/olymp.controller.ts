import {Request, Response} from "express"

export const OlympList = async (req: Request, res: Response): Promise<any> => {
    return res.render("olympSelection", { title: "Выбор олимпиад" });
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