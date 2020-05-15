"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = async (req, res) => {
    let usr = req.cookies.usr;
    return res.render("home", { title: "Главная страница", usr: usr });
};
exports.About = async (req, res) => {
    let usr = req.cookies.usr;
    return res.render("about", { title: "О нас", usr: usr });
};
