import App from "../app";

/**
 * Import middleware
 */
import * as bodyParser from "body-parser";
import loggerMiddleware from "../middleware/logger";

const arrMiddlewares: any = [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware];

/**
 * Import controllers etc, routes
 */
//import PostsController from "../controllers/posts/posts.controller";
import HomeController from "../controllers/get/home.controller";
import CertificateController from "../controllers/get/certificate.controller";
import AboutController from "../controllers/get/about.controller";
import LoginGetController from "../controllers/get/login.controller";
import RegisterGetController from "../controllers/get/register.controller";
import ProfileController from "../controllers/get/profile.controller";
import ValidateRegisterController from "../controllers/posts/register.validate.controller";

const arrControllers: any = [
	new HomeController(),
	new CertificateController(),
	new AboutController(),
	new LoginGetController(),
	new RegisterGetController(),
	new ProfileController(),
	new ValidateRegisterController(),
];

const app = new App({
	port: 3000,
	controllers: arrControllers,
	middleWares: arrMiddlewares,
});

app.listen();
