import App from "../app";

import * as bodyParser from "body-parser";
import loggerMiddleware from "../middleware/logger";

//import PostsController from "../controllers/posts/posts.controller";
import HomeController from "../controllers/get/home.controller";

const app = new App({
	port: 3000,
	controllers: [new HomeController()],
	middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware],
});

app.listen();
