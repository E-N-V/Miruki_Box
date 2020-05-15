"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../database/entity/User"));
const typeorm_1 = require("typeorm");
const Privilege_1 = require("../database/entity/Privilege");
exports.ProfileView = async (req, res) => {
    if (!req.cookies.usr)
        return res.redirect("/login");
    let usr = new User_1.default();
    usr.email = req.cookies.usr;
    const arr = await User_1.default.findOne(usr, { select: ["f_name", "s_name", "t_name", "email"] });
    const found = await typeorm_1.getConnection().getRepository(Privilege_1.Founder).findOne(usr.email);
    return res.render("profile", { title: "Профиль", iUser: arr, founder: found, usr: usr.email });
};
