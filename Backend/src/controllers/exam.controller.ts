import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { examService } from "../services";
import { Request, Response } from "express";
import { loginMiddleware } from "../middleware";

@controller('/exam', loginMiddleware)
export class examController{

    constructor(@inject(examService) private examServices: examService){}

    @httpGet('/startQuiz')
    async generateQuestions(req: Request, res: Response){
        try{
            res.json(await this.examServices.generateExam(req.headers.userId as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpPost('/submitQuiz')
    async submitExam(req: Request, res: Response){
        try{
            const data = req.body;
            res.json(await this.examServices.submitExam(req.headers.userId as string, data));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
}