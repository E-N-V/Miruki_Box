import { Router } from "express";
const route = Router();

import { Home, About } from "../controllers/home.controller";

route.get(["/", "/home", "/index", "/index.html", "/home.html"], Home);
route.get("/about", About)

export default route;
