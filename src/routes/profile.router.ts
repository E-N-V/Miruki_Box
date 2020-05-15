import {Router} from "express"
const route = Router()

import {ProfileView, ProfilePOST} from "../controllers/profile.controller"

route.get("/profile", ProfileView)
route.post("/profile", ProfilePOST)

export default route