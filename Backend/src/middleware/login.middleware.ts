import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import config from 'config';

@injectable()
export class loginMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(' ')[1];
        if(token){
            try{
                const tokenData = jwt.verify(token, config.get('SECRETE_KEY')) as JwtPayload;
                req.headers = {
                    ...req.headers,
                    userId : tokenData.userId,
                    role : tokenData.role
                }
                next();
            }catch(err: any){
                if(err instanceof JsonWebTokenError){
                    res.json({status: false, message : 'login again!'});
                }else{
                    res.json({status: false, message : err.message});
                }
            }
        }else{
            res.json({status: false, message: 'please provide token'})
        }
    }
}