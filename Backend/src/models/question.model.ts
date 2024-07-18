import mongoose from "mongoose";
import { IquestionModel } from "../interfaces/model.interfaces";

const questionSchema = new mongoose.Schema<IquestionModel>({
    question : { 
        type: String,
        required : [true, 'question is required'],
        unique : [true, 'question should be different']
    },
    options : [{
        type: String,
        required : [true, 'option is required!']
    }],
    difficulty : {
        type : Number,
        required : [true, 'question difficulty is requried!!']
    },
    answer : {
        type: String,
        required : [true, 'correct answer is required!']
    }
},{
    timestamps : true
})

export const questionModel = mongoose.model('questions', questionSchema);