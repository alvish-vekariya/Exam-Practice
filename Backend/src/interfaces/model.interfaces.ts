import mongoose from "mongoose";

export interface IuserModel {
    username : string,
    email : string | undefined,
    password: string,
    role : string,
    _id ?: mongoose.Types.ObjectId,
    createdAt ?: Date,
    updatedAt ?: Date,
    profile : String ,
    token ?: String
}

export interface IquestionModel{
    question : string | undefined,
    options : string[],
    difficulty : number,
    _id ?: mongoose.Types.ObjectId,
    createdAt ?: Date,
    updatedAt ?: Date,
    answer : string 
}

export interface IresultsModel{
    _id ?: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    score : string,
    percentage : number,
    difficulty : number,
    createdAt ?: Date,
    updatedAt ?: Date
}