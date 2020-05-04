import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next: any) => {
    console.log('Request logged:', req.method, req.path)
    next()
}
export default loggerMiddleware
