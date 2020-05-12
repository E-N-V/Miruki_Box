import { Request, Response } from "express";
import { User } from "../database/entity/User";
import { getConnection } from "typeorm";

export const LoginView = async (req: Request, res: Response): Promise<any> => {
	return res.render("login", { title: "Авторизация" });
};

export const LoginPost = async (req: Request, res: Response): Promise<any> => {
	let usr = new User();
	usr.email = req.body.e_mail;
	usr.password = req.body.password;

	if (!getConnection().getRepository(User).findOneOrFail(usr))
		return res.render("login", { title: "Авторизация", err: "Введенные вами данные не верны, повторите попытку." });

	res.cookie("usr", usr.email, {
		secure: false,
		httpOnly: false,
		expires: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate(),
			new Date().getHours() + 2,
			new Date().getMinutes(),
			new Date().getSeconds()
		),
	});
	return res.redirect("/");
};
