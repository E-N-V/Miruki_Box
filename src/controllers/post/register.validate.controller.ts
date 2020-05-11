import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
import mysql from "mysql";

export default class HomeController implements IControllerBase {
	public path = "/register";
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.post(this.path, this.index);
	}

	index = (req: Request, res: Response) => {
		let usrName = req.body.first_name;
		let usrSecondName = req.body.second_name;
		let usrThirdName = req.body.third_name;
		let email = req.body.e_mail;
		let pass = req.body.password;
		let conf_pass = req.body.conf_password;
		if (pass != conf_pass)
			return res.render("register", { title: "Регистрация", err: "Повторите свой пароль, он не верен." });
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
