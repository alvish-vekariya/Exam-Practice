import { injectable } from "inversify";
import { questionModel, resultModel, userModel } from "../models";
import mongoose from "mongoose";

@injectable()
export class adminService{
    async getUserStats(userId: string):Promise<object>{
        const examStats = await resultModel.aggregate([
            {
                $match : {
                    userId : new mongoose.Types.ObjectId(userId)
                }
            },{
                $group : {
                    _id: "$userId",
                    count : {$count : {}},
                    max_level : {$max : "$difficulty"}
                }
            }
        ])

        const history = await resultModel.find({userId: new mongoose.Types.ObjectId(userId)});
        return {status: true, stats: examStats, history : history}
    }

    async getUserCount():Promise<object>{
        const userCount = await userModel.countDocuments({role : 'user'});
        return {status: true, data : userCount};
    }

    async totalExamCount():Promise<object>{
        const totalExams = await resultModel.countDocuments();
        return {status: true, data: totalExams};
    }

    async getAllUsers():Promise<object>{
        const data = await userModel.find({role : 'user'});
        return {status: true, data: data};
    }

    async deleteUser(id: string){
        await userModel.findOneAndDelete({_id: id});
        return {status: true, message : 'user deleted successfully!'};
    }

    async getStats(){
        return {
            status : true,
            exams : await resultModel.countDocuments(),
            questions : await questionModel.countDocuments(),
            users : await userModel.countDocuments({role : 'user'})
        }
    }
}