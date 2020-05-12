import { Request, Response } from "express";

export const Home = async (req: Request, res: Response): Promise<any> => {
	console.log(req.cookies)
	return res.render("home", { title: "Главная страница" });
};

export const About = async (req: Request, res: Response): Promise<any> => {
	console.log(await req.cookies)
	console.log(await req.signedCookies)
	return res.render("about", { title: "О нас" });
};
