import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";

export default class HomeController implements IControllerBase {
	public path = "/register";
	public router = Router();
	public err: string = ""

	constructor(err?: string) {
		if (err) this.err = err
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get(this.path, this.index);
	}

	index = (req: Request, res: Response) => {
		res.render("register", { title: "Регистрация", err: this.err.length > 0? this.err : ""});
	};
}
