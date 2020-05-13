import { Router } from "express"
const route = Router()

import { FounderView, FounderOlympRedactor, FounderOlympView, FounderUsersView } from "../controllers/founder.controller"

route.get("/founder", FounderView)
route.get("/founder/users", FounderUsersView)
route.get("/founder/olymp", FounderOlympView)
route.get("/founder/olymp", )
route.get("/founder/olympRedactor", FounderOlympRedactor)

export default route