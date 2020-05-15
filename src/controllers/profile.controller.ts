import { Request, Response } from "express";
import User from "../database/entity/User"
import {getConnection} from "typeorm"
import { Founder } from "../database/entity/Privilege";

export const ProfileView = async (req: Request, res: Response): Promise<any> => {
	if (!req.cookies.usr) return res.redirect("/login")
	let usr = new User()
	usr.email = req.cookies.usr
	const arr = await User.findOne(usr, {select: ["f_name", "s_name", "t_name", "email"]})
	const found = await getConnection().getRepository(Founder).findOne(usr.email)
	return res.render("profile", { title: "Профиль", iUser: arr, founder: found, usr: usr.email });
};

export const ProfilePOST = async (req: Request, res: Response): Promise<any> => {
	if(req.body.exit_profile== "exit")
		res.clearCookie("usr").status(200).redirect("/")
	res.redirect("/profile")
}