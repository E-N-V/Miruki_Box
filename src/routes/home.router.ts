import { Router } from "express";
const route = Router();

import { Home, About, Certificate_ } from "../controllers/home.controller";

route.get(["/", "/home", "/index", "/index.html", "/home.html"], Home);
route.get("/about", About)
route.get("/certificate", Certificate_)

export default route;
