"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Privilege_1 = require("../database/entity/Privilege");
const OlympInfo_1 = __importDefault(require("../database/entity/OlympInfo"));
const User_1 = __importDefault(require("../database/entity/User"));
exports.FounderView = async (req, res) => {
    if (!req.cookies.usr)
        return res.status(404).render("404/demo2");
    let usr = new Privilege_1.Founder();
    usr.email = req.cookies.usr;
    if (!(await typeorm_1.getConnection().getRepository(Privilege_1.Founder).findOne(usr)))
        return res.status(404).render("404/demo2");
    return res.render("founder/Home");
};
exports.FounderOlympView = async (req, res) => {
    if (!req.cookies.usr)
        return res.status(404).render("404/demo2");
    let usr = new Privilege_1.Founder();
    usr.email = req.cookies.usr;
    if (!(await typeorm_1.getConnection().getRepository(Privilege_1.Founder).findOne(usr)))
        return res.status(404).render("404/demo2");
    let Olymp = await OlympInfo_1.default.find();
    return res.render("founder/Olymp", { arrOlymp: Olymp });
};
exports.FounderOlympRedactor = async (req, res) => {
    if (!req.cookies.usr)
        return res.status(404).render("404/demo2");
    let usr = new Privilege_1.Founder();
    usr.email = req.cookies.usr;
    if (!(await typeorm_1.getConnection().getRepository(Privilege_1.Founder).findOne(usr)))
        return res.status(404).render("404/demo2");
    return res.render("founder/OlympRedactor");
};
exports.FounderUsersView = async (req, res) => {
    if (!req.cookies.usr)
        return res.status(404).render("404/demo2");
    let usr = new Privilege_1.Founder();
    usr.email = req.cookies.usr;
    if (!(await typeorm_1.getConnection().getRepository(Privilege_1.Founder).findOne(usr)))
        return res.status(404).render("404/demo2");
    switch (req.query.type) {
        case "admin":
            var search = await typeorm_1.getConnection().getRepository(Privilege_1.Admin).find({ select: ["id_usr"] });
            var search_usr = await User_1.default.find({ where: search });
            break;
        case "founder":
            var search = await typeorm_1.getConnection().getRepository(Privilege_1.Admin).find({ select: ["id_usr"] });
            var search_usr = await User_1.default.find({ where: search });
            console.log(search_usr);
            break;
        case "moderator":
            break;
        case "student":
            break;
        case "student_op":
            break;
        case "student":
            break;
        case "prepod":
            break;
        default:
            break;
    }
};
exports.FounderOlympDownloadTable = async (req, res) => {
    let file;
    if (!req.body.filetable && req.body.fileinfotable)
        return res.render("founder/Olymp");
    file = req.body.fileinfotable ? req.body.fileinfotable : req.body.filetable;
    console.log(file.size);
    return res.render("founder/Olymp");
};
