"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const founder_controller_1 = require("../controllers/founder.controller");
route.get("/founder", founder_controller_1.FounderView);
route.get("/founder/users", founder_controller_1.FounderUsersView);
route.get("/founder/olymp", founder_controller_1.FounderOlympView);
route.get("/founder/olymp");
route.get("/founder/olympRedactor", founder_controller_1.FounderOlympRedactor);
exports.default = route;