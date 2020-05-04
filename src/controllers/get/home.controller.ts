import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";

export default class HomeController implements IControllerBase {
	public path = "/";
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get("/", this.index);
	}

	index = (req: Request, res: Response) => {
		const users = [
			{
				id: 1,
				name: "Ali",
			},
			{
				id: 2,
				name: "Can",
			},
			{
				id: 3,
				name: "Ahmet",
			},
		];
		res.render("home", { users, title: "test" });
	};
}
