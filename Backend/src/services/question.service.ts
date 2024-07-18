import { injectable } from "inversify";
import { IquestionModel } from "../interfaces";
import { questionModel } from "../models";
import { message } from "../constants";
import mongoose from "mongoose";

@injectable()
export class questionService {
  async addQuestion(questionData: IquestionModel): Promise<object> {
    await questionModel.create(questionData);
    return { status: true, message: message.CREATED_SUCCESSFULLY("Question") };
  }

  async getAllQuestion(): Promise<object> {
    const questions = await questionModel.find({});
    return { status: true, data: questions };
  }

  async deleteQuestion(id: string): Promise<object> {
    await questionModel.findOneAndDelete({ _id: id });
    return { status: true, message: "question deleted!!" };
  }

  async updateQuestion(questionId: string, data: any): Promise<object> {
    await questionModel.findOneAndUpdate({ _id: questionId }, { $set: data });
    return { status: true, message: "question updated successfully!!" };
  }

  async getQuestion(questionId: string):Promise<object>{
    const question = await questionModel.findOne({_id: questionId});
    return { status: true, data : question }
  }
}
