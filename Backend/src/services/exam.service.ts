import { injectable } from "inversify";
import { questionModel, resultModel } from "../models";
import mongoose from "mongoose";
import config from "config";

@injectable()
export class examService {
  async generateExam(userId: string): Promise<object> {
    const userRecord = await resultModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$userId",
          avg_diff: { $avg: "$difficulty" },
          avg_result: { $avg: "$percentage" },
        },
      },
    ]);

    let level = 1;

    if (userRecord.length) {
      if(userRecord[0].avg_diff === 5){
        level = 5;
      }else{
        if (userRecord[0].avg_result > 50) {
          level = Math.ceil(userRecord[0].avg_diff) + 1;
        } else {
          level = Math.ceil(userRecord[0].avg_diff);
        }
      }
    }

    const question_limit: number = config.get("QUESTION_LIMIT");

    let response_data: any = [];
    if (level === 1) {
      response_data = [
        ...response_data,
        ...(await questionModel.aggregate([
          { $match: { difficulty: level } },
          { $sample: { size: question_limit } },
        ])),
      ];
    } else {
      response_data = [
        ...response_data,
        ...(await questionModel.aggregate([
          { $match: { difficulty: level } },
          { $sample: { size: Math.floor(question_limit * 0.7) } },
        ])),
        ...(await questionModel.aggregate([
          { $match: { difficulty: level - 1 } },
          { $sample: { size: Math.ceil(question_limit * 0.3) } },
        ])),
      ];
    }

    return { status: true, data: response_data };
  }

  async submitExam(userId: string, data: any): Promise<object> {
    const questions = await questionModel.find({
      _id: { $in: Object.keys(data) },
    });
    let score = 0;
    let diff = 0;
    for (let q of questions) {
      diff = diff + q.difficulty;
      for (let sub of Object.keys(data)) {
        if (q.id === sub) {
          q.answer === data[sub] ? score++ : {};
        }
      }
    }

    await resultModel.create({
      userId: userId,
      score: `${score}/${questions.length}`,
      percentage: (100 * score) / questions.length,
      difficulty: Math.ceil(diff / questions.length),
    });

    return { status: true, message: "exam submitted successfully!", score : `${score}/${questions.length}`};
  }
}
