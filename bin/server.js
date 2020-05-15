"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
/**
 * Import middleware
 */
const bodyParser = __importStar(require("body-parser"));
const logger_1 = __importDefault(require("../middleware/logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const arrMiddlewares = [bodyParser.json(), bodyParser.urlencoded({ extended: true }), cookie_parser_1.default(), logger_1.default];
/**
 * Import routes
 */
const home_router_1 = __importDefault(require("../routes/home.router"));
const login_router_1 = __importDefault(require("../routes/login.router"));
const register_router_1 = __importDefault(require("../routes/register.router"));
const olymp_router_1 = __importDefault(require("../routes/olymp.router"));
const profile_router_1 = __importDefault(require("../routes/profile.router"));
const founder_router_1 = __importDefault(require("../routes/founder.router"));
const arrRoutes = [home_router_1.default, login_router_1.default, register_router_1.default, olymp_router_1.default, profile_router_1.default, founder_router_1.default];
/**
 * Init Web-site
 */
const app = new app_1.default({
    port: Number(process.env.PORT) || 3000,
    routes: arrRoutes,
    middleWares: arrMiddlewares,
});
/**
 * Start web-site
 */
app.listen();
