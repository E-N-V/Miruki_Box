import App from "../app";

/**
 * Import middleware
 */
import * as bodyParser from "body-parser";
import loggerMiddleware from "../middleware/logger";

const arrMiddlewares: any = [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware];

/**
 * Import routes
 */
import HomeRouter from "../routes/home.router";
import LoginRouter from "../routes/login.router";
import RegisterRouter from "../routes/register.router";
import OlympRouter from "../routes/olymp.router";

const arrRoutes: any = [HomeRouter, LoginRouter, RegisterRouter, OlympRouter];

/**
 * Init Web-site
 */
const app = new App({
	port: 3000,
	routes: arrRoutes,
	middleWares: arrMiddlewares,
});

/**
 * Start web-site
 */
app.listen();
