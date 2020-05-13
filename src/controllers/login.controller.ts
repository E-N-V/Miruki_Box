import { Request, Response } from "express";
import  User  from "../database/entity/User";
import { getConnection } from "typeorm";

export const LoginView = async (req: Request, res: Response): Promise<any> => {
	if (req.cookies.usr) res.redirect("/profile")
	let usr = req.cookies.usr
	return res.render("login", { title: "Авторизация", usr: usr });
};

export const LoginPost = async (req: Request, res: Response): Promise<any> => {
	let usr = new User();
	usr.email = req.body.e_mail;
	usr.password = req.body.password;
	let usra = req.cookies.usr

	if (!await User.findOne(usr))
		return res.render("login", { title: "Авторизация", err: "Введенные вами данные не верны, повторите попытку.", usr: usra });

	res.clearCookie("usr")
	res.cookie("usr", usr.email, {
		path: "/",
		secure: false,
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
	return res.redirect("/");
};
