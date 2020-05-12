import { Request, Response } from "express";
import {User} from "../database/entity/User"
import {getConnection} from "typeorm"

export const ProfileView = async (req: Request, res: Response): Promise<any> => {
	let usr = new User()
	console.log(req.cookies)
    /*
	usr.email = req.cookies
	const arr = await getConnection().getRepository(User).findOne(usr, {select: ["f_name", "s_name", "t_name", "email"]})
	 */
	let arr = {}
	return res.render("profile", { title: "Профиль", iUser: arr });
};
