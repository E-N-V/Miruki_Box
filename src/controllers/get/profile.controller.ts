import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
import mysql from "mysql"

export default class HomeController implements IControllerBase {
	public path = "/profile";
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get(this.path, this.index);
	}

	index = (req: Request, res: Response) => {
		let arr: UserType = {
			f_name: "a",
			s_name: "s",
			t_name: "s",
			email: "assHoleFinger"
		}
		res.render("profile", { title: "Профиль", iUser: arr });
	};
}

type UserType = {
	f_name: string
	s_name: string
	t_name: string
	email: string
}