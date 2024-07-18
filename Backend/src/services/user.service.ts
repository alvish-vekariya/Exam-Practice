import { injectable } from "inversify";
import { resultModel, userModel } from "../models";
import { IuserModel } from "../interfaces";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

@injectable()
export class userServices {
    async login(loginData: any): Promise<object> {
        const foundUser = await userModel.findOne({ email: loginData.email });
        if (foundUser) {
            const checkPaswd = await bcrypt.compare(
                loginData.password,
                foundUser.password
            );
            if (checkPaswd) {
                const tokenData = {
                    userId: foundUser._id,
                    role: foundUser.role,
                };
                const token = jwt.sign(tokenData, config.get("SECRETE_KEY"));
                await userModel.findOneAndUpdate(
                    { _id: foundUser._id },
                    { $set: { token: token } }
                );
                return {
                    status: true,
                    message: "user loggin successfully!!",
                    token: token,
                    role: foundUser.role,
                };
            } else {
                return { status: false, message: "incorrect password!" };
            }
        } else {
            return { status: false, message: "user not found, please signup!!" };
        }
    }

    async logout(userId: string): Promise<object> {
        await userModel.findOneAndUpdate(
            { _id: userId },
            { $unset: { token: { $exists: true } } }
        );
        return { status: true, message: "logout successfully!!" };
    }

    async signup(bodyData: IuserModel): Promise<object> {
        await userModel.create(bodyData);
        return { status: true, message: "signup successfully!!" };
    }

    async updateProfile(userID: string, data: IuserModel): Promise<object> {
        await userModel.findOneAndUpdate(
            { _id: userID },
            { $set: data }
        );
        return { status: true, message: "profile updated!" };
    }

    async getDetails(userId: string): Promise<object> {
        const userDetails = await userModel.findOne({ _id: userId });
        return { status: true, data: userDetails };
    }

    async getHistory(userId: string): Promise<object> {
        const stat = await resultModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: "$userId",
                    count: { $count: {} },
                    Max_level: { $max: "$difficulty" },
                },
            },
        ]);
        const history = await resultModel.find({
            userId: new mongoose.Types.ObjectId(userId),
        });
        return { status: true, data: history, stats: stat };
    }

    async getStats(id: string): Promise<object> {
        const exams = await resultModel.countDocuments({
            userId: new mongoose.Types.ObjectId(id),
        });
        return { status: true, data: exams };
    }
}
