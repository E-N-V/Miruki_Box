import {Router} from "express"
const route = Router()

import { RegisterPost, RegisterView } from "../controllers/register.controller"

route.get("/register", RegisterView)
route.post("/register", RegisterPost)

export default route