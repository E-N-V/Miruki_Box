"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./database/entity/User"));
const Privilege_1 = require("./database/entity/Privilege");
const fs_1 = __importDefault(require("fs"));
const OlympInfo_1 = __importDefault(require("./database/entity/OlympInfo"));
const ParseOlympFile_1 = require("./util/ParseOlympFile");
class app {
    constructor(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.routes);
        this.assets();
        this.template();
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    routes(routes) {
        routes.forEach((route) => {
            this.app.use(route);
        });
    }
    assets() {
        this.app.use(express_1.default.static(path_1.join(__dirname, "public")));
        this.app.use(express_1.default.static(path_1.join(__dirname, "views")));
    }
    template() {
        this.app.set("view engine", "pug");
    }
    listen() {
        this.app.listen(this.port, async () => {
            console.log(`App listening on the port -> ${this.port} go it now`);
            const con = await typeorm_1.createConnection();
            if (con.isConnected) {
                console.log(`Database is connected!`);
            }
            else {
                Error("Database is not connected!");
                con.close();
            }
            /**
             * Import table founder this site
             */
            let usr = new User_1.default();
            let GOOD = new Privilege_1.Founder();
            async function addFounder(usr, GOOD) {
                if (!(await con.getRepository(User_1.default).findOne(usr)))
                    await con.getRepository(User_1.default).save(usr);
                if (!(await con.getRepository(Privilege_1.Founder).findOne(usr.email, { select: ["email"] })))
                    await con.getRepository(Privilege_1.Founder).save(GOOD);
            }
            usr.id = 1;
            usr.email = "ophcik@mail.ru";
            usr.f_name = "Егор";
            usr.s_name = "Леонтьев";
            usr.t_name = "Константинович";
            usr.password = "2659430_MIRUKI_CREATOR_EGOR";
            GOOD.id = 1;
            GOOD.user = usr;
            GOOD.email = usr.email;
            await addFounder(usr, GOOD);
            usr.id = 2;
            usr.email = "sm.nk@inbox.ru";
            usr.f_name = "Никита";
            usr.s_name = "Самошкин";
            usr.t_name = "Алексеевич";
            usr.password = "2659430_MIRUKI_CREATOR_NIKITA";
            GOOD.id = 2;
            GOOD.user = usr;
            GOOD.email = usr.email;
            await addFounder(usr, GOOD);
            usr.id = 3;
            usr.email = "vladskrip432@gmail.com";
            usr.f_name = "Владислав";
            usr.s_name = "Скрипко";
            usr.t_name = "Евгеньевич";
            usr.password = "2659430_MIRUKI_CREATOR_VLAD";
            GOOD.id = 3;
            GOOD.user = usr;
            GOOD.email = usr.email;
            await addFounder(usr, GOOD);
            /**
             * Init OlympInfo table
             */
            let file = ParseOlympFile_1.ParseFile(path_1.join(__dirname, "test", "olymp_info.ods"));
            let olympInfo = new OlympInfo_1.default();
            for (const item of file) {
                olympInfo.id = item.id;
                olympInfo.section = item.section;
                olympInfo.title = item.title;
                olympInfo.except = item.except;
                olympInfo.description = item.description;
                await OlympInfo_1.default.save(olympInfo);
            }
            /**
             * Init JSON for olymp and usr
             */
            for (const itemFile of fs_1.default.readdirSync(path_1.join(__dirname, "database", "tests"))) {
                if (itemFile.split(".")[1] == "ods") {
                    let file = ParseOlympFile_1.ParseFile(path_1.join(__dirname, "database", "tests", itemFile));
                    let question = file.length > 20 ? 20 : file.length;
                    if (!fs_1.default.existsSync(path_1.join(__dirname, "database", "json", itemFile.split(".")[0] + ".json"))) {
                        fs_1.default.writeFileSync(path_1.join(__dirname, "database", "json", itemFile.split(".")[0] + ".json"), JSON.stringify({
                            question,
                            usr: [],
                        }), { encoding: "utf-8" });
                    }
                    let olympInfo = await OlympInfo_1.default.findOne((new OlympInfo_1.default().id = Number(itemFile.split(".")[0])));
                    olympInfo.path_json = path_1.join(__dirname, "database", "json", itemFile.split(".")[0] + ".json");
                    olympInfo.path = path_1.join(__dirname, "database", "tests", itemFile);
                    await OlympInfo_1.default.update({ id: Number(itemFile.split(".")[0]) }, olympInfo);
                }
            }
        });
    }
}
exports.default = app;
