import { Request, Response } from "express";
import { getConnection} from "typeorm"
import {User} from "../database/entity/User"

export const RegisterView = async (req: Request, res: Response): Promise<any> => {
	return res.render("register", { title: "Регистрация" });
};

export const RegisterPost = async (req: Request, res: Response): Promise<any> => {
	let conf_pass = req.body.conf_password;
	let chck_pass = req.body.password
	if (chck_pass != conf_pass)
		return res.render("register", { title: "Регистрация", err: "Повторите свой пароль, он не верен." });
	let usr = new User()
	usr.f_name = req.body.first_name;
	usr.s_name = req.body.second_name;
	usr.t_name = req.body.third_name;
	usr.email = req.body.e_mail;
	usr.password = req.body.password;
	let con = getConnection().getRepository(User)
	if (con.findOneOrFail(usr)) return res.render("register", {title: "Регистрация", err: "Пользователь, с введеными данными уже существует."})
	con.save(usr)
	res.cookie("usr", req.body.e_mail, {
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
