/// <reference types="qs" />
import { Request, Response } from 'express';
declare const loggerMiddleware: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, resp: Response<any>, next: any) => void;
export default loggerMiddleware;
