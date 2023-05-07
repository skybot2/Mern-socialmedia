import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        min: 2,
        max: 32,
    },
    lastName : {
        type: String,
        required: true,
        min: 2,
        max: 32,
    },
    email : {
        type: String,
        required: true,
        max: 64,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    friends : {
        type: Array,
        default: [],
    },
    location : String,
    occupation : String,
    viewedprofile : Number,
    impressions : Number,

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;