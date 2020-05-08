import { Router, Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";

export default class CertificateController implements IControllerBase {
	public path = "/certificate";
	public router = Router();

	constructor() {
        this.initRoutes();
	}

	public initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + "/user", this.indexUser)
	}

	index = (req: Request, res: Response) => {
        res.render("home", { title: "certificate" });
	};

	indexUser = (req: Request, res: Response) => {
		res.status(200).send("<div> Hello </div>");
	};
}
