import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class adminMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        req.headers.role === 'admin' ?
            next()
        :
            res.json({status: false, message : 'you do not have access over here!'});
        
    }
}