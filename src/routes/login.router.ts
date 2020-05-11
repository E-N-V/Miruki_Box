import { Router } from "express";
const route = Router();

import { LoginPost, LoginView } from "../controllers/login.controller";

route.get("/login", LoginView);
route.post("/login", LoginPost)

export default route;
