import { Request, Response } from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
} from "inversify-express-utils";
import { questionService } from "../services";
import { inject } from "inversify";
import { IquestionModel } from "../interfaces";
import { adminMiddleware, loginMiddleware } from "../middleware";

@controller("/question", loginMiddleware, adminMiddleware)
export class questionController {
    constructor(
        @inject(questionService) private questionServices: questionService
    ) { }

    @httpPost("/addQuestion")
    async addQuestion(req: Request, res: Response) {
        try {
            const data = req.body as IquestionModel;
            res.json(await this.questionServices.addQuestion(data));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }
    @httpPut("/updateQuestion/:id")
    async updateQuestion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            res.json(await this.questionServices.updateQuestion(id, data));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }
    @httpDelete("/deleteQuestion/:id")
    async deleteQuestion(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            res.json(await this.questionServices.deleteQuestion(id));
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }
    @httpGet("/getAllQuestions")
    async getAllQuestions(req: Request, res: Response) {
        try {
            res.json(await this.questionServices.getAllQuestion());
        } catch (err: any) {
            res.json({ status: false, message: err.message });
        }
    }
    
    @httpGet("/getQuestion/:id")
    async getQuestion(req: Request, res: Response){
        try{
            res.json(await this.questionServices.getQuestion(req.params.id as string));
        }catch(err: any){
            res.json({ status: false, message: err.message });
        }
    }
}
