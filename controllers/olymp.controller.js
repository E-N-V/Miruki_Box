"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OlympInfo_1 = __importDefault(require("../database/entity/OlympInfo"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const ParseOlympFile_1 = require("../util/ParseOlympFile");
const InProgressOlymp_1 = __importDefault(require("../database/entity/InProgressOlymp"));
const User_1 = __importDefault(require("../database/entity/User"));
exports.OlympList = async (req, res) => {
    let search = new OlympInfo_1.default();
    if (typeof req.query.section == "string")
        search.section = req.query.section;
    else
        search.section = "PROG";
    let olymp = await OlympInfo_1.default.find(search);
    let usr = req.cookies.usr;
    return res.render("olympSelection", { title: "Выбор олимпиад", olymp, usr });
};
exports.OlympWalk = async (req, res) => {
    let usr = req.cookies.usr;
    if (!/^([0-9])\d*$/gim.test(req.params.id))
        return res.redirect("/olympList");
    let olympId = Number(req.params.id);
    let olympInfo = await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = olympId));
    let olympInfoParse = ParseOlympFile_1.ParseFile(olympInfo.path);
    let dataParse = olympInfoParse;
    /* let num = Math.floor(Math.random() * (olympInfoParse.length - 1) + 1);
    dataParse.push(olympInfoParse[num]);
    for (let i = 0; i < (olympInfoParse.length > 20 ? 20 : olympInfoParse.length); i++) {
        for (const item of dataParse)
            if (num != item.id) {
                dataParse.push(olympInfoParse[num]);
            }
        num = Math.floor(Math.random() * (olympInfoParse.length - 1) + 1);
    } */
    res.cookie("oid", olympId, {
        path: "/result",
        httpOnly: true,
        expires: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()),
    });
    let a = new InProgressOlymp_1.default();
    a.oid = olympInfo.id;
    let us = new User_1.default();
    us.email = usr;
    a.uid = (await User_1.default.findOne(us)).id;
    for (const item of JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "..", "database", "json", olympId + ".json"), { encoding: "utf-8" })).usr)
        if (item.id == a.uid)
            return res.redirect("/olympList");
    if (await InProgressOlymp_1.default.findOne(a))
        return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse, olymp: olympInfo });
    a.time_start = `${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`;
    a.date = `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`;
    await InProgressOlymp_1.default.save(a);
    return res.render("olympWalkthrough", { title: "Прохождение", usr, dataParse, olymp: olympInfo });
};
exports.OlympResult = async (req, res) => {
    let usr = req.cookies.usr;
    let oid = req.cookies.oid;
    let olympID = req.body.olympID;
    if (oid != olympID)
        res.redirect("/olympList");
    let dataParse = require(path_1.join(__dirname, "..", "database", "json", oid + ".json")).question;
    let correct = 15;
    let time = (await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = oid))).time;
    let ipo = new InProgressOlymp_1.default();
    ipo.oid = oid;
    let us = new User_1.default();
    us.email = usr;
    ipo.uid = (await User_1.default.findOne(us)).id;
    let timer_on = (await InProgressOlymp_1.default.findOne(ipo)).time_start;
    timer_on =
        Number(timer_on.split(".")[0]) * 60 + Number(timer_on.split(".")[1]) * 60 + Number(timer_on.split(".")[2]);
    let timer_off = new Date().getHours() * 60 + new Date().getMinutes() * 60 + new Date().getSeconds();
    let time_pass = timer_off - timer_on;
    let buffer = JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "..", "database", "json", oid + ".json"), { encoding: "utf-8" }));
    const user = {
        id: ipo.uid,
        correct,
        time_pass,
        time: (await InProgressOlymp_1.default.findOne(ipo)).date,
    };
    buffer.usr.push(user);
    fs_1.default.writeFileSync(path_1.join(__dirname, "..", "database", "json", oid + ".json"), JSON.stringify(buffer), {
        encoding: "utf-8",
    });
    await InProgressOlymp_1.default.delete(ipo);
    return res.clearCookie("oid").status(200).render("testResult", { title: "Результат", usr, dataParse, correct, time, time_pass });
};
exports.OlympIdView = async (req, res) => {
    let olympId = new OlympInfo_1.default();
    if (!req.params.id)
        return res.redirect("/olympList");
    if (typeof req.params.id == "number")
        olympId.id = Number(req.params.id);
    else
        olympId.id = 1;
    let olymp = await OlympInfo_1.default.findOne(olympId);
    let UsrJsonPassed = JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "..", "database", "json", olymp ? olymp.id.toString() + ".json" : "1.json"), {
        encoding: "utf-8",
    }));
    let usr = req.cookies.usr;
    return res.render("olympInfo", { olymp, UsrJsonPassed, usr });
};
exports.OlympRedact = async (req, res) => {
    if (!/^([0-9])\d*$/gim.test(req.params.id))
        return res.redirect("/olympList");
    let olympId = Number(req.params.id);
    let olympInfo = await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = olympId));
    let olympParse = ParseOlympFile_1.ParseFile(path_1.join(__dirname, "..", "database", "tests", olympId + ".ods"));
    let usr = req.cookies.usr;
    return res.render("olympRedact", { usr, olympParse, olympInfo });
};
exports.OlympRedactPOST = async (req, res) => {
    if (!/^([0-9])\d*$/gim.test(req.params.id))
        return res.redirect("/olympList");
    let olympInfoData = new OlympInfo_1.default();
    olympInfoData.title = req.body.title;
    olympInfoData.except = req.body.except;
    olympInfoData.description = req.body.description;
    olympInfoData.time = Number(req.body.time);
    await OlympInfo_1.default.save(olympInfoData);
    let count = fs_1.default.readdirSync(path_1.join(__dirname, "..", "database", "tests")).length;
    fs_1.default.writeFileSync(path_1.join(__dirname, "database", "json", count + ".json"), JSON.stringify({
        question: req.body.query.length,
        usr: [],
    }), { encoding: "utf-8" });
    let olympInfo = await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = count));
    olympInfo.path_json = path_1.join(__dirname, "database", "json", count + ".json");
    olympInfo.path = path_1.join(__dirname, "database", "tests", count.toString());
    await OlympInfo_1.default.update({ id: Number(count) }, olympInfo);
    let data = [];
    if (req.body.query) {
        for (var i = 0; i < req.body.query.length; i++) {
            data.push({
                id: i,
                type: "",
                query: "",
                answer: "",
                right_: "",
                f: "",
            });
        }
    }
    if (req.body.query) {
        for (var i = 0; i < req.body.query.length; i++) {
            data[i].query = req.body.query[i];
        }
    }
    if (req.body.radios) {
        for (var i = Number(req.body.radios[0]); i < Number(req.body.radios[Number(req.body.radios.length) - 1]); i = Number(req.body.radios[0])) {
            data[i].type = "radio";
            let str = "";
            let ii = i;
            for (var i = 0; i < Number(req.body.answers[0]); i++) {
                str += req.body.answertext_r[0] + ";";
                req.body.answertext_r.shift();
                if (req.body.radio[0] == "+")
                    data[ii].right_ = req.body.radio[i];
                req.body.radio.shift();
            }
            data[i].answer = str;
            req.body.radios.shift();
        }
    }
    if (req.body.textboxs) {
        for (var i = Number(req.body.textbox[0]); i < Number(req.body.textbox[Number(req.body.textbox.length) - 1]); i = Number(req.body.textbox[0])) {
            data[i].query = "textbox";
            let str = "";
            for (var i = 0; i < req.body.textboxs.length; i++) {
                str += req.body.textbox[0];
                req.body.textbox.shift();
            }
            data[i].right_ = str;
        }
    }
    if (req.body.checkboxs) {
        for (var i = Number(req.body.checkboxs[0]); i < Number(req.body.checkboxs[Number(req.body.checkbox.length) - 1]); i = Number(req.body.checkboxs[0])) {
            data[i].query = "checkbox";
            let str = "";
            let ii = i;
            data[i].right_ = "";
            for (var i = 0; i < Number(req.body.answers[0]); i++) {
                str += req.body.answertext_c[0] + ";";
                req.body.answertext_c.shift();
                if (req.body.radio[0] == "+")
                    data[ii].right_ += req.body.radio[i] + ";";
                req.body.radio.shift();
            }
            data[i].answer = str;
            req.body.checkboxs.shift();
        }
    }
    if (req.body.files) {
        for (var i = 0; i < Number(req.body.files[Number(req.body.files.length) - 1]); i++) {
            let d = Number(req.body.files[i]);
            data[d].f = req.body.file[i];
        }
    }
    ParseOlympFile_1.ImportJson2Ods(Number(req.params.id), data);
    return res.redirect("/olympList");
};
exports.OlympCreatePOST = async (req, res) => {
    if (!/^([0-9])\d*$/gim.test(req.params.id))
        return res.redirect("/olympList");
    let olympInfoData = await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = Number(req.params.id)));
    await OlympInfo_1.default.delete(olympInfoData);
    olympInfoData.title = req.body.title;
    olympInfoData.except = req.body.except;
    olympInfoData.description = req.body.description;
    olympInfoData.time = Number(req.body.time);
    await OlympInfo_1.default.save(olympInfoData);
    let data = ParseOlympFile_1.ParseFile(path_1.join(__dirname, "..", "database", "tests", req.params.id + ".ods"));
    if (req.body.query) {
        for (var i = 0; i < req.body.query.length; i++) {
            data[i].query = req.body.query[i];
        }
    }
    if (req.body.radios) {
        for (var i = Number(req.body.radios[0]); i < Number(req.body.radios[Number(req.body.radios.length) - 1]); i = Number(req.body.radios[0])) {
            data[i].type = "radio";
            let str = "";
            let ii = i;
            for (var i = 0; i < Number(req.body.answers[0]); i++) {
                str += req.body.answertext_r[0] + ";";
                req.body.answertext_r.shift();
                if (req.body.radio[0] == "+")
                    data[ii].right_ = req.body.radio[i];
                req.body.radio.shift();
            }
            data[i].answer = str;
            req.body.radios.shift();
        }
    }
    if (req.body.textboxs) {
        for (var i = Number(req.body.textbox[0]); i < Number(req.body.textbox[Number(req.body.textbox.length) - 1]); i = Number(req.body.textbox[0])) {
            data[i].query = "textbox";
            let str = "";
            for (var i = 0; i < req.body.textboxs.length; i++) {
                str += req.body.textbox[0];
                req.body.textbox.shift();
            }
            data[i].right_ = str;
        }
    }
    if (req.body.checkboxs) {
        for (var i = Number(req.body.checkboxs[0]); i < Number(req.body.checkboxs[Number(req.body.checkbox.length) - 1]); i = Number(req.body.checkboxs[0])) {
            data[i].query = "checkbox";
            let str = "";
            let ii = i;
            data[i].right_ = "";
            for (var i = 0; i < Number(req.body.answers[0]); i++) {
                str += req.body.answertext_c[0] + ";";
                req.body.answertext_c.shift();
                if (req.body.radio[0] == "+")
                    data[ii].right_ += req.body.radio[i] + ";";
                req.body.radio.shift();
            }
            data[i].answer = str;
            req.body.checkboxs.shift();
        }
    }
    if (req.body.files) {
        for (var i = 0; i < Number(req.body.files[Number(req.body.files.length) - 1]); i++) {
            let d = Number(req.body.files[i]);
            data[d].f = req.body.file[i];
        }
    }
    ParseOlympFile_1.ImportJson2Ods(Number(req.params.id), data);
    return res.redirect("/olympList");
};
exports.OlympCreate = async (req, res) => {
    let usr = req.cookies.usr;
    return res.render("olympConstructor", { title: "Выбор олимпиад", usr });
};
