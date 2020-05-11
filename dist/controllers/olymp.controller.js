"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlympList = async (req, res) => {
    return res.render("olympSelection", { title: "Выбор олимпиад" });
};
exports.OlympWalk = async (req, res) => {
    return res.render("olympWalkthrough", { title: "Прохождение" });
};
exports.OlympCreate = async (req, res) => {
    return res.render("olympConstructor", { title: "Создание олимпиады" });
};
exports.OlympResult = async (req, res) => {
    return res.render("testResult", { title: "Результат" });
};
