import mongoose from "mongoose";
import { IresultsModel } from "../interfaces/model.interfaces";

const resultSchema = new mongoose.Schema<IresultsModel>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required: [true, 'userID is required!!']
    },
    score : {
        type : String,
        required: [true, 'score is required!'] 
    },
    percentage : {
        type : Number,
        required : [true, 'percentage is required']
    },
    difficulty : {
        type : Number,
        min : 0,
        max : 5,
        required : [true, 'difficulty is required!']
    }
},{
    timestamps: true
})

export const resultModel = mongoose.model('results', resultSchema);