"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const home_controller_1 = require("../controllers/home.controller");
route.get(["/", "/home", "/index", "/index.html", "/home.html"], home_controller_1.Home);
route.get("/about", home_controller_1.About);
route.get("/certificate", home_controller_1.Certificate_);
exports.default = route;
