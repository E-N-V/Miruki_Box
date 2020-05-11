import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
import mysql from "mysql";

export default class HomeController implements IControllerBase {
    public path = "/result";
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.index);
    }

    index = (req: Request, res: Response) => {
        res.render("testResult", {title: "Результат"});
    };
}
