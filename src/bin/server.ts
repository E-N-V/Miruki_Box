import App from "../app";

/**
 * Import middleware
 */
import * as bodyParser from "body-parser";
import loggerMiddleware from "../middleware/logger";
import cookieParser from "cookie-parser";

const arrMiddlewares: any = [bodyParser.json(), bodyParser.urlencoded({ extended: true }), cookieParser(), loggerMiddleware];

/**
 * Import routes
 */
import HomeRouter from "../routes/home.router";
import LoginRouter from "../routes/login.router";
import RegisterRouter from "../routes/register.router";
import OlympRouter from "../routes/olymp.router";
import ProfileRouter from "../routes/profile.router"

const arrRoutes: any = [HomeRouter, LoginRouter, RegisterRouter, OlympRouter, ProfileRouter];

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
