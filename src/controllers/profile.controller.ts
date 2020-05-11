import { Request, Response } from "express";
type UserType = {
	f_name: string;
	s_name: string;
	t_name: string;
	email: string;
};

export const ProfileView = async (req: Request, res: Response): Promise<any> => {
	let arr: UserType = {
		f_name: "a",
		s_name: "s",
		t_name: "s",
		email: "assHoleFinger",
	};
	return res.render("profile", { title: "Профиль", iUser: arr });
};
