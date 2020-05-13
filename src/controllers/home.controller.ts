import { Request, Response } from "express";

export const Home = async (req: Request, res: Response): Promise<void> => {
	let usr = req.cookies.usr
	return res.render("home", { title: "Главная страница", usr: usr});
};

export const About = async (req: Request, res: Response): Promise<void> => {
	let usr = req.cookies.usr
	return res.render("about", { title: "О нас", usr: usr });
};
