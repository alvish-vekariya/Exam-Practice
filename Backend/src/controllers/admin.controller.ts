import { controller, httpDelete, httpGet } from "inversify-express-utils";
import { adminMiddleware, loginMiddleware } from "../middleware";
import { adminService } from "../services";
import { inject } from "inversify";
import { Request, Response } from "express";

@controller('/admin', loginMiddleware, adminMiddleware)
export class adminController{
    constructor(@inject(adminService) private adminServices: adminService){}

    @httpGet('/getUserStats/:id')
    async getUserStats(req: Request, res: Response){
        try{
            res.json(await this.adminServices.getUserStats(req.params.id as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpGet('/totalExamCount')
    async totalExamCount(req: Request, res: Response){
        try{
            res.json(await this.adminServices.totalExamCount());
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpGet('/getUserCount')
    async getUserCount(req: Request, res: Response){
        try{
            res.json(await this.adminServices.getUserCount());
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

    @httpGet('/getAllUsers')
    async getAllUsers(req: Request, res: Response){
        try{
            res.json(await this.adminServices.getAllUsers());
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

    @httpDelete('/deleteUser/:id')
    async deleteUser(req: Request, res: Response){
        try{
            res.json(await this.adminServices.deleteUser(req.params.id as string));
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

    @httpGet('/homeStats')
    async homeStats(req: Request, res: Response){
        try{
            res.json(await this.adminServices.getStats());
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

}