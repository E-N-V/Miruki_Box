"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
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
            console.log(`App listening on the http://localhost:${this.port}`);
            (await typeorm_1.createConnection()).isConnected ? console.log(`Database is connected!`) : Error("Database is not connected!");
            /*
            Это для Егора, ибо у него дырявая голова

            const Connection: Connection = await createConnection()
            let usr = new User()
            usr.email = "ophcik@mail.ru"
            usr.f_name = "Егор"
            usr.s_name = "Леонтьев"
            usr.t_name = "Константинович"
            usr.password = "123456"
            await Connection.getRepository(User).save(usr)
            console.log(await Connection.getRepository(User).find())
            */
        });
    }
}
exports.default = app;
