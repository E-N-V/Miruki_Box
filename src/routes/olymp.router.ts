import {Router} from "express"
const route = Router()

import {OlympResult,OlympCreate,OlympList,OlympWalk, OlympIdView} from "../controllers/olymp.controller"

route.get("/olympList", OlympList)
route.get("/olympList/create", OlympCreate)
route.get("/olympList/:id", OlympIdView)
route.get("/walk/:id", OlympWalk)
route.post("/result", OlympResult)

export default route