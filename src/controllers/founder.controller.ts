import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Founder, Admin } from "../database/entity/Privilege";
import OlympInfo from "../database/entity/OlympInfo";
import  User  from "../database/entity/User";

export const FounderView = async (req: Request, res: Response): Promise<any> => {
	if (!req.cookies.usr) return res.status(404).render("404/demo2");
	let usr = new Founder();
	usr.email = req.cookies.usr;
	if (!(await getConnection().getRepository(Founder).findOne(usr))) return res.status(404).render("404/demo2");
	return res.render("founder/Home");
};

export const FounderOlympView = async (req: Request, res: Response): Promise<any> => {
	if (!req.cookies.usr) return res.status(404).render("404/demo2");
	let usr = new Founder();
	usr.email = req.cookies.usr;
	if (!(await getConnection().getRepository(Founder).findOne(usr))) return res.status(404).render("404/demo2");

	let Olymp = await OlympInfo.find();
	return res.render("founder/Olymp", { arrOlymp: Olymp });
};

export const FounderOlympRedactor = async (req: Request, res: Response): Promise<any> => {
	if (!req.cookies.usr) return res.status(404).render("404/demo2");
	let usr = new Founder();
	usr.email = req.cookies.usr;
	if (!(await getConnection().getRepository(Founder).findOne(usr))) return res.status(404).render("404/demo2");
	return res.render("founder/OlympRedactor");
};

export const FounderUsersView = async (req: Request, res: Response): Promise<any> => {
	if (!req.cookies.usr) return res.status(404).render("404/demo2");
	let usr = new Founder();
	usr.email = req.cookies.usr;
	if (!(await getConnection().getRepository(Founder).findOne(usr))) return res.status(404).render("404/demo2");

	switch (req.query.type) {
		case "admin":
            var search = await getConnection().getRepository(Admin).find({select: ["id_usr"]});
            var search_usr = await User.find({where: search})
			break;
        case "founder":
            var search = await getConnection().getRepository(Admin).find({select: ["id_usr"]});
            var search_usr = await User.find({where: search})
            console.log(search_usr)
            break
        case "moderator":
            break
        case "student":
            break
        case "student_op":
            break
        case "student":
            break
        case "prepod":
            break
		default:
			break;
	}
};

export const FounderOlympDownloadTable = async (req: Request, res: Response): Promise<any> => {
	let file: File
	if (!req.body.filetable && req.body.fileinfotable) return res.render("founder/Olymp")
	file = req.body.fileinfotable? req.body.fileinfotable : req.body.filetable
	console.log(file.size)
	return res.render("founder/Olymp")
}