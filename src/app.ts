import express, { Application } from "express";
import { join } from "path";
import { createConnection, getConnection } from "typeorm";
import  User  from "./database/entity/User";
import { Founder } from "./database/entity/Privilege";
import fs from "fs";
import OlympInfo from "./database/entity/OlympInfo";
import ods from "xlsx"
import { ParseFile } from "./util/ParseOlympFile";

export default class app {
	public app: Application;
	public port: number;

	constructor(appInit: { port: number; middleWares: any; routes: any }) {
		this.app = express();
		this.port = appInit.port;

		this.middlewares(appInit.middleWares);
		this.routes(appInit.routes);
		this.assets();
		this.template();
	}

	private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}

	private routes(routes: { forEach: (arg0: (route: any) => void) => void }) {
		routes.forEach((route) => {
			this.app.use(route);
		});
	}

	private assets() {
		this.app.use(express.static(join(__dirname, "public")));
		this.app.use(express.static(join(__dirname, "views")));
	}

	private template() {
		this.app.set("view engine", "pug");
	}

	public listen() {
		this.app.listen(this.port, async () => {
			//(await createConnection()).dropDatabase()
			//await getConnection().close()
			//console.clear()
			console.log(`App listening on the http://localhost:${this.port} go it now`);
			const con = await createConnection();
			if (con.isConnected) {
				console.log(`Database is connected!`);
			} else {
				Error("Database is not connected!");
				con.close();
			}

			/**
			 * Import table founder this site
			 */
			let usr = new User();
			let GOOD = new Founder();
			async function addFounder(usr: User, GOOD: Founder) {
				if (!(await con.getRepository(User).findOne(usr))) await con.getRepository(User).save(usr);
				if (!(await con.getRepository(Founder).findOne(usr.email, { select: ["email"] })))
					await con.getRepository(Founder).save(GOOD);
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
			 * Init JSON for olymp and usr
			 */
			for (const itemFile of fs.readdirSync(join(__dirname, "database", "tests"))) {
				if (itemFile.split(".")[1] != "ods") return
				let file = ParseFile(join(__dirname, "database", "tests", itemFile))
				
				let question: number = file.length;

				if (!fs.existsSync(join(__dirname, "database", "json", itemFile.split(".")[0] + ".json"))) {
					fs.writeFileSync(
						join(__dirname, "database", "json", itemFile.split(".")[0] + ".json"),
						JSON.stringify({
							question,
							usr: [],
						}),
						{ encoding: "utf-8" }
					);
					
					let olympInfo = await OlympInfo.findOne(new OlympInfo().id = Number(itemFile.split(".")[0]))
					olympInfo!.path_json = join(__dirname, "database", "json", itemFile.split(".")[0] + ".json")
					olympInfo!.path = join(__dirname, "database", "tests", itemFile)
					await OlympInfo.update({id: Number(itemFile.split(".")[0])}, olympInfo!)
				}
			}
		});
	}
}
