import { Application } from "express";
export default class app {
    app: Application;
    port: number;
    constructor(appInit: {
        port: number;
        middleWares: any;
        routes: any;
    });
    private middlewares;
    private routes;
    private assets;
    private template;
    listen(): void;
}
