import { Request, Response } from "express";
import OlympInfo from "../database/entity/OlympInfo";
import { getConnection } from "typeorm";
import fs from "fs";
import { join } from "path";
import { ParseFile, ImportJson2Ods } from "../util/ParseOlympFile";
import InProgressOlymp from "../database/entity/InProgressOlymp";
import User from "../database/entity/User";

export const OlympList = async (req: Request, res: Response): Promise<any> => {
	let search = new OlympInfo();
	if (typeof req.query.section == "string") search.section = req.query.section;
	else search.section = "PROG";
	let olymp = await OlympInfo.find(search);
	let usr = req.cookies.usr;
	return res.render("olympSelection", { title: "Выбор олимпиад", olymp, usr });
};

export const OlympWalk = async (req: Request, res: Response): Promise<any> => {
	let usr = req.cookies.usr;
	if (!/^([0-9])\d*$/gim.test(req.params.id)) return res.redirect("/olympList");
	let olympId = Number(req.params.id);
	let olympInfo = await OlympInfo.findOne((new OlympInfo().id = olympId));
	let olympInfoParse = ParseFile(olympInfo!.path);
	let question: any[] = [];
	let dataParse: any[] = [];
	for (let i = 0; i < 20; i++) {
		for (const item of question) if (i == item) return;
		let num = olympInfoParse[Math.random() * (olympInfoParse.length - 1) + 1];
		dataParse.push(num);
		question.push(num);
	}
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
	let a = new InProgressOlymp();
	a.oid = olympInfo!.id;
	let us = new User();
	us.email = usr;
	a.uid = (await User.findOne(us))!.id;
	for (const item of JSON.parse(
		fs.readFileSync(join(__dirname, "..", "database", "json", olympId + ".json"), { encoding: "utf-8" })
	).usr)
		if (item.id == a.uid) return res.redirect("/olympList");
	if (await InProgressOlymp.findOne(a))
		return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse, olymp: olympInfo });
	a.time_start = `${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`;
	a.date = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`;
	await InProgressOlymp.save(a);
	return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse, olymp: olympInfo });
};

export const OlympResult = async (req: Request, res: Response): Promise<any> => {
	let usr = req.cookies.usr;
	let oid = req.cookies.oid;
	let olympID = req.body.olympID;
	if (oid != olympID) res.redirect("/olympList");

	let dataParse = require(join(__dirname, "..", "database", "json", oid + ".json")).question;
	let correct = 15;
	let time = (await OlympInfo.findOne((new OlympInfo().id = oid)))!.time;
	let ipo = new InProgressOlymp();
	ipo.oid = oid;
	let us = new User();
	us.email = usr;
	ipo.uid = (await User.findOne(us))!.id;
	let timer_on: string | number = (await InProgressOlymp.findOne(ipo))!.time_start;
	timer_on =
		Number(timer_on.split(".")[0]) * 60 + Number(timer_on.split(".")[1]) * 60 + Number(timer_on.split(".")[2]);
	let timer_off = new Date().getHours() * 60 + new Date().getMinutes() * 60 + new Date().getSeconds();
	let time_pass = timer_off - timer_on;
	let buffer = JSON.parse(
		fs.readFileSync(join(__dirname, "..", "database", "json", oid + ".json"), { encoding: "utf-8" })
	);
	const user = {
		id: ipo.uid,
		correct,
		time_pass,
		time: (await InProgressOlymp.findOne(ipo))!.date,
	};
	buffer.usr.push(user);
	fs.writeFileSync(join(__dirname, "..", "database", "json", oid + ".json"), JSON.stringify(buffer), {
		encoding: "utf-8",
	});
	await InProgressOlymp.delete(ipo);
	res.cookie("oid", 0, { path: "/result/validate/trueUser/validateUser" });
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

export const OlympRedact = async (req: Request, res: Response): Promise<any> => {
	if (!/^([0-9])\d*$/gim.test(req.params.id)) return res.redirect("/olympList");
	let olympId = Number(req.params.id);
	let olympInfo = await OlympInfo.findOne((new OlympInfo().id = olympId));
	let olympParse = ParseFile(join(__dirname, "..", "database", "tests", olympId + ".ods"));
	let usr = req.cookies.usr;
	return res.render("olympRedact", { usr, olympParse, olympInfo });
};

export const OlympRedactPOST = async (req: Request, res: Response): Promise<any> => {
	if (!/^([0-9])\d*$/gim.test(req.params.id)) return res.redirect("/olympList");
    let olympInfoData = new OlympInfo();
	olympInfoData!.title = req.body.title;
	olympInfoData!.except = req.body.except;
	olympInfoData!.description = req.body.description;
	olympInfoData!.time = Number(req.body.time);
	await OlympInfo.save(olympInfoData!);
	let count = fs.readdirSync(join(__dirname, "..", "database", "tests")).length
	fs.writeFileSync(
		join(__dirname, "database", "json", count + ".json"),
		JSON.stringify({
			question: req.body.query.length,
			usr: [],
		}),
		{ encoding: "utf-8" }
	);

let olympInfo = await OlympInfo.findOne((new OlympInfo().id = count));
olympInfo!.path_json = join(__dirname, "database", "json", count + ".json");
olympInfo!.path = join(__dirname, "database", "tests", count.toString());
await OlympInfo.update({ id: Number(count) }, olympInfo!);
    let data: any[]=[];
    if (req.body.query){
	for (var i = 0; i < req.body.query.length; i++) {
		data.push({
			id: i,
			type: "",
			query: "",
			answer: "",
			right_: "",
			f: ""
		})
    }}
    if (req.body.query){
	for (var i = 0; i < req.body.query.length; i++) {
		data[i].query = req.body.query[i];
    }}
    if (req.body.radios){
	for (
		var i = Number(req.body.radios[0]);
		i < Number(req.body.radios[Number(req.body.radios.length) - 1]);
		i = Number(req.body.radios[0])
	) {
		data[i].type = "radio";
		let str: string = "";
		let ii = i;
		for (var i = 0; i < Number(req.body.answers[0]); i++) {
			str += req.body.answertext_r[0] + ";";
			req.body.answertext_r.shift();
			if (req.body.radio[0] == "+") data[ii].right_ = req.body.radio[i];
			req.body.radio.shift();
		}
		data[i].answer = str;
		req.body.radios.shift();
    }}
    if (req.body.textboxs){
	for (
		var i = Number(req.body.textbox[0]);
		i < Number(req.body.textbox[Number(req.body.textbox.length) - 1]);
		i = Number(req.body.textbox[0])
	) {
		data[i].query = "textbox";
		let str: string = "";
		for (var i = 0; i < req.body.textboxs.length; i++) {
			str += req.body.textbox[0];
			req.body.textbox.shift();
		}
		data[i].right_ = str;
    }}
    if (req.body.checkboxs){
	for (
		var i = Number(req.body.checkboxs[0]);
		i < Number(req.body.checkboxs[Number(req.body.checkbox.length) - 1]);
		i = Number(req.body.checkboxs[0])
	) {
		data[i].query = "checkbox";
		let str: string = "";
		let ii = i;
		data[i].right_ = "";
		for (var i = 0; i < Number(req.body.answers[0]); i++) {
			str += req.body.answertext_c[0] + ";";
			req.body.answertext_c.shift();
			if (req.body.radio[0] == "+") data[ii].right_ += req.body.radio[i] + ";";
			req.body.radio.shift();
		}
		data[i].answer = str;
		req.body.checkboxs.shift();
    }}
    if (req.body.files){
	for (var i = 0; i < Number(req.body.files[Number(req.body.files.length) - 1]); i++) {
		let d = Number(req.body.files[i]);
		data[d].f = req.body.file[i];
	}}
	ImportJson2Ods(Number(req.params.id), data);
	return res.redirect("/olympList");
};

export const OlympCreatePOST = async (req: Request, res: Response): Promise<any> => {
	if (!/^([0-9])\d*$/gim.test(req.params.id)) return res.redirect("/olympList");
    let olympInfoData = await OlympInfo.findOne(new OlympInfo().id = Number(req.params.id));
    await OlympInfo.delete(olympInfoData!)
	olympInfoData!.title = req.body.title;
	olympInfoData!.except = req.body.except;
	olympInfoData!.description = req.body.description;
	olympInfoData!.time = Number(req.body.time);
	await OlympInfo.save(olympInfoData!);
    let data: any = ParseFile(join(__dirname, "..", "database", "tests", req.params.id + ".ods"));
    if (req.body.query){
	for (var i = 0; i < req.body.query.length; i++) {
		data[i].query = req.body.query[i];
    }}
    if (req.body.radios){
	for (
		var i = Number(req.body.radios[0]);
		i < Number(req.body.radios[Number(req.body.radios.length) - 1]);
		i = Number(req.body.radios[0])
	) {
		data[i].type = "radio";
		let str: string = "";
		let ii = i;
		for (var i = 0; i < Number(req.body.answers[0]); i++) {
			str += req.body.answertext_r[0] + ";";
			req.body.answertext_r.shift();
			if (req.body.radio[0] == "+") data[ii].right_ = req.body.radio[i];
			req.body.radio.shift();
		}
		data[i].answer = str;
		req.body.radios.shift();
    }}
    if (req.body.textboxs){
	for (
		var i = Number(req.body.textbox[0]);
		i < Number(req.body.textbox[Number(req.body.textbox.length) - 1]);
		i = Number(req.body.textbox[0])
	) {
		data[i].query = "textbox";
		let str: string = "";
		for (var i = 0; i < req.body.textboxs.length; i++) {
			str += req.body.textbox[0];
			req.body.textbox.shift();
		}
		data[i].right_ = str;
    }}
    if (req.body.checkboxs){
	for (
		var i = Number(req.body.checkboxs[0]);
		i < Number(req.body.checkboxs[Number(req.body.checkbox.length) - 1]);
		i = Number(req.body.checkboxs[0])
	) {
		data[i].query = "checkbox";
		let str: string = "";
		let ii = i;
		data[i].right_ = "";
		for (var i = 0; i < Number(req.body.answers[0]); i++) {
			str += req.body.answertext_c[0] + ";";
			req.body.answertext_c.shift();
			if (req.body.radio[0] == "+") data[ii].right_ += req.body.radio[i] + ";";
			req.body.radio.shift();
		}
		data[i].answer = str;
		req.body.checkboxs.shift();
    }}
    if (req.body.files){
	for (var i = 0; i < Number(req.body.files[Number(req.body.files.length) - 1]); i++) {
		let d = Number(req.body.files[i]);
		data[d].f = req.body.file[i];
	}}
	ImportJson2Ods(Number(req.params.id), data);
	return res.redirect("/olympList");
};

export const OlympCreate = async (req: Request, res: Response): Promise<any> => {
	let usr = req.cookies.usr;
	return res.render("olympConstructor", { title: "Выбор олимпиад", usr });
}