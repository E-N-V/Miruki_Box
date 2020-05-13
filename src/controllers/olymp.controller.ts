import { Request, Response } from "express";
import OlympInfo from "../database/entity/OlympInfo";
import { getConnection } from "typeorm";
import fs from "fs";
import { join } from "path";
import { ParseFile } from "../util/ParseOlympFile";
import InProgressOlymp from "../database/entity/InProgressOlymp";
import User from "../database/entity/User";

export const OlympList = async (req: Request, res: Response): Promise<any> => {
	let search = new OlympInfo();
	if (typeof req.query.section == "string") search.section = req.query.section;
	else search.section = "PROG";
	let olymp = await getConnection().getRepository(OlympInfo).find(search);
	let usr = req.cookies.usr;
	return res.render("olympSelection", { title: "Выбор олимпиад", olymp, usr });
};

export const OlympWalk = async (req: Request, res: Response): Promise<any> => {
    let usr = req.cookies.usr;
	if (!/^([0-9])\d*$/gim.test(req.params.id)) return res.redirect("/olympList");
	let olympId = Number(req.params.id);
	let olympInfo = await OlympInfo.findOne((new OlympInfo().id = olympId));
	let olympInfoParse = ParseFile(olympInfo!.path);
	res.cookie("oid", olympId, {
        path: "/result",
        httpOnly: true,
		expires: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() + 1,
			new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
		),
    });
    let a = new InProgressOlymp()
    a.oid = olympInfo!.id
    let us = new User()
    us.email = usr
    a.uid = (await User.findOne(us))!.id
    for (const item of JSON.parse(fs.readFileSync(join(__dirname, "..", "database", "json", olympId + ".json"), {encoding: "utf-8"})).usr)
        if (item.id == a.uid) return res.redirect("/olympList")
    if (await InProgressOlymp.findOne(a)) return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse: olympInfoParse, olymp: olympInfo });
    a.time_start = `${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`
    a.date = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`
    await InProgressOlymp.save(a)
	return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse: olympInfoParse, olymp: olympInfo });
};

export const OlympCreate = async (req: Request, res: Response): Promise<any> => {
	let usr = req.cookies.usr;
	return res.render("olympConstructor", { title: "Создание олимпиады", usr });
};

export const OlympResult = async (req: Request, res: Response): Promise<any> => {
    let usr = req.cookies.usr;
    let oid = req.cookies.oid
    let olympID = req.body.olympID
    if (oid != olympID) res.redirect("/olympList")

    let dataParse = require(join(__dirname, "..", "database", "json", oid + ".json")).question;
    let correct = 15
    let time = (await OlympInfo.findOne(new OlympInfo().id = oid))!.time
    let ipo = new InProgressOlymp()
    ipo.oid = oid
    let us = new User()
    us.email = usr
    ipo.uid = (await User.findOne(us))!.id
    let timer_on: string | number = (await InProgressOlymp.findOne(ipo))!.time_start
    timer_on = Number(timer_on.split(".")[0]) * 60 + Number(timer_on.split(".")[1]) * 60 + Number(timer_on.split(".")[2])
    let timer_off = new Date().getHours() * 60 + new Date().getMinutes() * 60 + new Date().getSeconds()
    let time_pass = timer_off - timer_on
    let buffer = JSON.parse(fs.readFileSync(join(__dirname, "..", "database", "json", oid + ".json"), {encoding: "utf-8"}))
    const user = {
        id: ipo.uid,
        correct,
        time_pass,
        time: (await InProgressOlymp.findOne(ipo))!.date
    }
    buffer.usr.push(user)
    fs.writeFileSync(join(__dirname, "..", "database", "json", oid + ".json"), JSON.stringify(buffer), {encoding: "utf-8"})
    await InProgressOlymp.delete(ipo)
    res.cookie("oid", 0, {path: "/result/validate/trueUser/validateUser"})
	return res.render("testResult", { title: "Результат", usr, dataParse, correct, time, time_pass });
};

export const OlympIdView = async (req: Request, res: Response): Promise<any> => {
	let olympId = new OlympInfo();
	if (!req.params.id) return res.redirect("/olympList");
	if (typeof req.params.id == "number") olympId.id = Number(req.params.id);
	else olympId.id = 1;
	let olymp = await OlympInfo.findOne(olympId);
	let UsrJsonPassed = JSON.parse(
		fs.readFileSync(join(__dirname, "..", "database", "json", olymp ? olymp.id.toString() + ".json" : "1.json"), {
			encoding: "utf-8",
		})
	);
	let usr = req.cookies.usr;
	return res.render("olympInfo", { olymp, UsrJsonPassed, usr });
};
