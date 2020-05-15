/// <reference types="qs" />
import { Request, Response } from "express";
export declare const OlympList: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympWalk: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympResult: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympIdView: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympRedact: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympRedactPOST: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympCreatePOST: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
export declare const OlympCreate: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>) => Promise<any>;
