import { Request, Response } from "express";

export const LoginView = async (req: Request, res: Response): Promise<any> => {
	return res.render("login", { title: "Авторизация" });
};

export const LoginPost = async (req: Request, res: Response): Promise<any> => {
	let email = req.body.e_mail;
	let pass = req.body.password;

	let EMAIL = "";
	let PASSWORD = "";
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
	return res.redirect("/");
};
