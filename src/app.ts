import express, { Application } from "express";
import { join } from "path";
import { createConnection } from "typeorm";

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
            console.log(`App listening on the http://localhost:${this.port}`);
			const con = (await createConnection())
			con.isConnected? console.log(`Database is connected!`) : ()=>{
				Error("Database is not connected!")
				con.close()
			} 
			
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
