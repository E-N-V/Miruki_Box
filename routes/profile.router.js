"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const profile_controller_1 = require("../controllers/profile.controller");
route.get("/profile", profile_controller_1.ProfileView);
route.post("/profile", profile_controller_1.ProfilePOST);
exports.default = route;
