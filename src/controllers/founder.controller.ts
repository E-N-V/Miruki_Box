import {Request, Response} from "express"
import { getConnection } from "typeorm"
import { Founder } from "../database/entity/Privilege"
import { TablesOlymp } from "../database/entity/Olymp"

export const FounderView = async (req: Request, res: Response): Promise<any> =>{
    if (!req.cookies.usr) return res.status(404).render("404/demo2")
    let usr = new Founder()
    usr.email = req.cookies.usr
    if (!await getConnection().getRepository(Founder).findOne(usr)) return res.status(404).render("404/demo2")
    return res.render("founder/Home")
}

export const FounderOlympView = async (req: Request, res: Response): Promise<any> =>{
    if (!req.cookies.usr) return res.status(404).render("404/demo2")
    let usr = new Founder()
    usr.email = req.cookies.usr
    if (!await getConnection().getRepository(Founder).findOne(usr)) return res.status(404).render("404/demo2")

    let Olymp = await getConnection().getRepository(TablesOlymp).find()
    return res.render("founder/Olymp", {arrOlymp: Olymp})
}

export const FounderOlympRedactor = async (req: Request, res: Response): Promise<any> =>{
    if (!req.cookies.usr) return res.status(404).render("404/demo2")
    let usr = new Founder()
    usr.email = req.cookies.usr
    if (!await getConnection().getRepository(Founder).findOne(usr)) return res.status(404).render("404/demo2")
    return res.render("founder/OlympRedactor")
}