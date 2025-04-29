// File: src/models/User.ts
import mongoose, { Schema } from "mongoose";


export interface IUser{
    handle: string;
    name: string;
    email: string;
    password: string;
    description?: string;
    profilePicture?: string;
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,        
        unique: true,

    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    profilePicture: {
        type: String,
        trim: true,
        lowercase: true,
        default: null,
    },
});

const User = mongoose.model("User", userSchema);
export default User;
