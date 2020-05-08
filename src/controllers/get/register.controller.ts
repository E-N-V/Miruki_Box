import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";

export default class HomeController implements IControllerBase {
	public path = "/register";
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get(this.path, this.index);
	}

	index = (req: Request, res: Response) => {
		res.render("register", { title: "Регистрация" });
	};
}
