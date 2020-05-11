import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
import mysql from "mysql";

export default class HomeController implements IControllerBase {
    public path = "/login";
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.path, this.index);
    }

    index = (req: Request, res: Response) => {
        let email = req.body.e_mail;
        let pass = req.body.password;
        
        let EMAIL = ""
        let PASSWORD = ""
        if (pass != PASSWORD || email != EMAIL)
            return res.render("login", { title: "Регистрация", err: "Введенные вами данные не верны, повторите попытку." });
        res.cookie("usr", email, {
            path: "/",
            httpOnly: true,
            expires: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                new Date().getHours() + 2,
                new Date().getMinutes(),
                new Date().getSeconds()
            ),
        });
        res.redirect("/");
    };
}
