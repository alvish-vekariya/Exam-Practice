import mongoose from "mongoose";
import config from 'config';

export const connection = async()=>{
    const url:string = config.get("MONGO_URL")
    await mongoose.connect(url);
}