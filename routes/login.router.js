"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const login_controller_1 = require("../controllers/login.controller");
route.get("/login", login_controller_1.LoginView);
route.post("/login", login_controller_1.LoginPost);
exports.default = route;
