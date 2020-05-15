import {Router} from "express"
const route = Router()

import {OlympResult,OlympCreate,OlympList,OlympWalk, OlympIdView, OlympRedact, OlympRedactPOST, OlympCreatePOST} from "../controllers/olymp.controller"

route.get("/olympList", OlympList)
route.get("/olympList/create", OlympCreate)
route.get("/olympList/redact/:id", OlympRedact)
route.get("/olympList/:id", OlympIdView)
route.get("/walk/:id", OlympWalk)
route.post("/result", OlympResult)
route.post("/olympList/redact/:id", OlympRedactPOST)
route.post("/olympList/create", OlympCreatePOST)

export default route