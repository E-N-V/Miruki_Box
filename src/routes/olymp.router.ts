import {Router} from "express"
const route = Router()

import {OlympResult,OlympCreate,OlympList,OlympWalk} from "../controllers/olymp.controller"

route.get("/olympList", OlympList)
route.get("/olympList/create", OlympCreate)
route.get("/walk/*", OlympWalk)
route.get("/result", OlympResult)

export default route