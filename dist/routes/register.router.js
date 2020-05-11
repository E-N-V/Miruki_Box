"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const register_controller_1 = require("../controllers/register.controller");
route.get("/register", register_controller_1.RegisterView);
route.post("/register", register_controller_1.RegisterPost);
exports.default = route;
