import { Request, Response } from "express";

export const Home = async (req: Request, res: Response): Promise<any> => {
	return res.render("home", { title: "Главная страница" });
};

export const About = async (req: Request, res: Response): Promise<any> => {
	return res.render("about", { title: "О нас" });
};
