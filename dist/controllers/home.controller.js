"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = async (req, res) => {
    return res.render("home", { title: "Главная страница" });
};
exports.About = async (req, res) => {
    return res.render("about", { title: "О нас" });
};
