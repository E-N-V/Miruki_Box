import {Router} from "express"
const route = Router()

import {ProfileView} from "../controllers/profile.controller"

route.get("/profile", ProfileView)

export default route