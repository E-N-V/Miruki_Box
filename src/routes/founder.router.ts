import { Router } from "express"
const route = Router()

import { FounderView, FounderOlympRedactor, FounderOlympView } from "../controllers/founder.controller"

route.get("/founder", FounderView)
route.get("/founder/olymp", FounderOlympView)
route.get("/founder/olympRedactor", FounderOlympRedactor)

export default route