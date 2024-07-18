import mongoose from "mongoose";
import { IuserModel } from "../interfaces/model.interfaces";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<IuserModel>({
    username : {
        type : String,
        required : [true, 'username is required!!']
    },
    email : {
        type : String,
        required : [true, 'email is required!!'],
        unique : [true, 'email must be unique!!']
    },
    password : {
        type : String,
        required : [true, 'password is required!!']
    },
    role : {
        type : String,
        required : [true, 'role is required!'],
        enum : ['admin', 'user']
    },
    profile: {
        type: String,
        required : [true, 'profile pic is required!']
    },
    token : {
        type : String
    }
},{
    timestamps: true
})

userSchema.pre('save', async function(){
    const newPswd = await bcrypt.hash(this.password, 10);
    this.password = newPswd;
})

export const userModel = mongoose.model('users', userSchema);