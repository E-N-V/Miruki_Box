"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../database/entity/User"));
exports.RegisterView = async (req, res) => {
    if (req.cookies.usr)
        res.redirect("/profile");
    let usr = req.cookies.usr;
    return res.render("register", { title: "Регистрация", usr });
};
exports.RegisterPost = async (req, res) => {
    let usra = req.cookies.usr;
    let usr = new User_1.default();
    usr.f_name = req.body.first_name;
    usr.s_name = req.body.second_name;
    usr.t_name = req.body.third_name;
    usr.email = req.body.e_mail;
    usr.password = req.body.password;
    if (usr.password != req.body.conf_password)
        return res.render("register", { title: "Регистрация", err: "Повторите свой пароль, он не верен." });
    const con = typeorm_1.getConnection().getRepository(User_1.default);
    if (await con.findOne(usr))
        return res.render("register", { title: "Регистрация", err: "Пользователь, с введеными данными уже существует.", usr: usra });
    con.save(usr);
    res.clearCookie("usr");
    res.cookie("usr", usr.email, {
        path: "/",
        secure: false,
        httpOnly: true,
        expires: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 2, new Date().getMinutes(), new Date().getSeconds()),
    });
    return res.redirect("/");
};
