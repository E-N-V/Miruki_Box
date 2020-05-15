"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../database/entity/User"));
exports.LoginView = async (req, res) => {
    if (req.cookies.usr)
        res.redirect("/profile");
    let usr = req.cookies.usr;
    return res.render("login", { title: "Авторизация", usr: usr });
};
exports.LoginPost = async (req, res) => {
    let usr = new User_1.default();
    usr.email = req.body.e_mail;
    usr.password = req.body.password;
    let usra = req.cookies.usr;
    if (!await User_1.default.findOne(usr))
        return res.render("login", { title: "Авторизация", err: "Введенные вами данные не верны, повторите попытку.", usr: usra });
    res.clearCookie("usr");
    res.cookie("usr", usr.email, {
        path: "/",
        secure: false,
        httpOnly: true,
        expires: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 2, new Date().getMinutes(), new Date().getSeconds()),
    });
    return res.redirect("/");
};
