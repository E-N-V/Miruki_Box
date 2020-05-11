import { Request, Response } from "express";

export const RegisterView = async (req: Request, res: Response): Promise<any> => {
	return res.render("register", { title: "Регистрация" });
};

export const RegisterPost = async (req: Request, res: Response): Promise<any> => {
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
	return res.redirect("/");
};
